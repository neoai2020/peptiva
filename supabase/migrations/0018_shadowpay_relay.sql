-- KingsGate only accepts live keys from allow-listed IPs, and Supabase Edge
-- Functions have no fixed outbound IP. Calls therefore go through a relay
-- with a fixed IP (scripts/shadowpay-relay). Its address and shared token
-- live in Vault next to the key:
--   select vault.create_secret('https://relay.example.com', 'shadowpay_relay_url');
--   select vault.create_secret('<random token>', 'shadowpay_relay_token');
-- Leave both unset to call KingsGate directly.

create or replace function public.get_shadowpay_config()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'secret_key',  (select decrypted_secret from vault.decrypted_secrets where name = 'shadowpay_secret_key' limit 1),
    'relay_url',   (select decrypted_secret from vault.decrypted_secrets where name = 'shadowpay_relay_url' limit 1),
    'relay_token', (select decrypted_secret from vault.decrypted_secrets where name = 'shadowpay_relay_token' limit 1)
  );
$$;

revoke all on function public.get_shadowpay_config() from public, anon, authenticated;
grant execute on function public.get_shadowpay_config() to service_role;
