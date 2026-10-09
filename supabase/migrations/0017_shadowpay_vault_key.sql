-- Lets edge functions read the ShadowPay secret key from Supabase Vault
-- (encrypted at rest) when SHADOWPAY_SECRET_KEY isn't set as a function
-- secret. Store or rotate it with:
--   select vault.create_secret('sp_test_…', 'shadowpay_secret_key');
--   select vault.update_secret(id, 'sp_live_…') from vault.secrets where name = 'shadowpay_secret_key';

create or replace function public.get_shadowpay_secret_key()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select decrypted_secret from vault.decrypted_secrets where name = 'shadowpay_secret_key' limit 1;
$$;

revoke all on function public.get_shadowpay_secret_key() from public, anon, authenticated;
grant execute on function public.get_shadowpay_secret_key() to service_role;
