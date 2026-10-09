# Runs the relay as a service component of the site's App Platform app, so
# KingsGate calls leave from the app's dedicated egress IPs. App Platform
# terminates HTTPS, so Caddy serves plain HTTP on 8080. Set RELAY_TOKEN as
# an encrypted environment variable on the component.
FROM caddy:2.8-alpine
COPY Caddyfile /etc/caddy/Caddyfile
ENV RELAY_DOMAIN=:8080
EXPOSE 8080
