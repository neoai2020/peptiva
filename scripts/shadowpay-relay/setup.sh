#!/usr/bin/env bash
# Installs the ShadowPay relay on a fresh Ubuntu server (e.g. a DigitalOcean
# Droplet). Point RELAY_DOMAIN's DNS A record at the server first so Caddy
# can get an HTTPS certificate.
#
#   sudo RELAY_DOMAIN=relay.example.com RELAY_TOKEN=<random> bash setup.sh
set -euo pipefail

: "${RELAY_DOMAIN:?set RELAY_DOMAIN}"
: "${RELAY_TOKEN:?set RELAY_TOKEN}"

apt-get update
apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl gpg ufw
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | gpg --dearmor --yes -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  > /etc/apt/sources.list.d/caddy-stable.list
apt-get update
apt-get install -y caddy

install -m 0644 "$(dirname "$0")/Caddyfile" /etc/caddy/Caddyfile
mkdir -p /etc/systemd/system/caddy.service.d
cat > /etc/systemd/system/caddy.service.d/relay.conf <<EOF
[Service]
Environment=RELAY_DOMAIN=${RELAY_DOMAIN}
Environment=RELAY_TOKEN=${RELAY_TOKEN}
EOF
chmod 0600 /etc/systemd/system/caddy.service.d/relay.conf

ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

systemctl daemon-reload
systemctl enable caddy
systemctl restart caddy

echo "Relay running at https://${RELAY_DOMAIN}"
echo "Allow-list this IP on the live key: $(curl -s https://api.ipify.org)"
