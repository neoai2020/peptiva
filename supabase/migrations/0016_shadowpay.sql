-- ShadowPay (KingsGate) replaces Uprails. Orders are now created as
-- 'pending' before the shopper pays; only the verified webhook marks
-- them paid, via mark_order_paid() below.

alter table public.orders
  add column shadowpay_checkout_id text,
  add column charged_amount numeric(10, 2),
  add column charged_currency text,
  add column paid_at timestamptz;

create unique index orders_shadowpay_checkout_id
  on public.orders (shadowpay_checkout_id)
  where shadowpay_checkout_id is not null;

-- One row per webhook event we acted on. ShadowPay retries deliveries
-- with the same event id, so the primary key makes them no-ops.
create table public.payment_events (
  id text primary key,
  order_id uuid references public.orders(id) on delete set null,
  type text not null,
  created_at timestamptz not null default now()
);

alter table public.payment_events enable row level security;

create policy "admins read payment_events" on public.payment_events
  for select using (public.is_admin());

-- Marks an order paid from a verified checkout.succeeded event, once.
-- Returns one of: paid | already_paid | mismatch | needs_review | unknown_order.
-- Only 'paid' means the caller should fulfil (Zapier, promo count).
create or replace function public.mark_order_paid(
  p_order_id uuid,
  p_event_id text,
  p_checkout_id text,
  p_amount numeric,
  p_currency text
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  o public.orders%rowtype;
begin
  select * into o from public.orders where id = p_order_id for update;
  if not found then
    return 'unknown_order';
  end if;

  if o.status in ('paid', 'fulfilled')
     or exists (select 1 from public.payment_events where id = p_event_id) then
    return 'already_paid';
  end if;

  -- A success for an order an admin already cancelled or refunded means
  -- money arrived that has to be refunded by KingsGate, not fulfilled.
  if o.status in ('cancelled', 'refunded') then
    update public.orders
       set metadata = metadata || jsonb_build_object('payment_review', 'paid_after_' || o.status::text)
     where id = p_order_id;
    return 'needs_review';
  end if;

  -- Checked before the event is recorded so a mismatch is never consumed.
  if o.charged_amount is distinct from p_amount
     or upper(coalesce(o.charged_currency, '')) <> upper(p_currency) then
    update public.orders
       set metadata = metadata || jsonb_build_object(
             'payment_review', 'amount_mismatch',
             'paid_amount', p_amount::text,
             'paid_currency', p_currency)
     where id = p_order_id;
    return 'mismatch';
  end if;

  insert into public.payment_events (id, order_id, type)
  values (p_event_id, p_order_id, 'checkout.succeeded');

  update public.orders
     set status = 'paid',
         paid_at = now(),
         shadowpay_checkout_id = coalesce(shadowpay_checkout_id, p_checkout_id)
   where id = p_order_id;

  return 'paid';
end;
$$;

revoke all on function public.mark_order_paid(uuid, text, text, numeric, text) from public, anon, authenticated;
grant execute on function public.mark_order_paid(uuid, text, text, numeric, text) to service_role;
