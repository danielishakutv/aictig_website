# AICTiG Website — Deployment Guide

**Stack:** Vite + React SPA → Contabo VPS → Apache (Virtualmin) → `/home/aictig/public_html`  
**Backend:** WordPress + WPGraphQL at `be.aictig.org` (proxied, never exposed to browser)

---

## Architecture Overview

```
Browser → https://www.aictig.org
                │
           Apache (port 443)
                │
      ┌─────────┼─────────────────────────┐
      │         │                         │
  /wp-graphql   /documents/*        Everything else
      │         │                         │
  ProxyPass   ProxyPass            Serve static files
  → be.aictig  → be.aictig         from dist/
    .org         .org/wp-content
    /index.php   /uploads/
    ?graphql
```

The WordPress backend domain (`be.aictig.org`) is **never** exposed to the browser.  
All requests go through your own domain via Apache reverse proxy.

---

## Prerequisites

- Contabo VPS with Virtualmin/Webmin installed
- Domain `aictig.org` / `www.aictig.org` DNS pointing to your VPS IP
- SSH access (root or sudo user)
- Node.js 18+ installed on the server
- Git installed on the server

---

## 1. Server Preparation (one-time)

### 1.1 Install Node.js (if not already installed)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v   # should be 20.x
npm -v
```

### 1.2 Enable required Apache modules

```bash
sudo a2enmod proxy proxy_http rewrite headers ssl
sudo systemctl restart apache2
```

### 1.3 Create the virtual server in Virtualmin

1. Log in to **Virtualmin** (`https://your-ip:10000`)
2. **Create Virtual Server** (or select existing one for `aictig.org`)
   - Domain: `aictig.org`
   - Home directory: `/home/aictig`
   - Document root will be: `/home/aictig/public_html`

---

## 2. Push Code to GitHub (from your local machine)

On your local Windows machine:

```powershell
cd C:\Users\USER\Desktop\AICTIG\Website

# Initialize git if not done already
git init
git remote add origin https://github.com/YOUR_USERNAME/aictig-website.git

# Add and commit
git add .
git commit -m "Production deploy"

# Push
git push -u origin main
```

---

## 3. Clone & Build on the Server

SSH into your VPS:

```bash
# Clone the repo into public_html
cd /home/aictig
rm -rf public_html   # remove default Virtualmin placeholder
git clone https://github.com/YOUR_USERNAME/aictig-website.git public_html

# Install dependencies and build
cd /home/aictig/public_html
npm install
npm run build
```

The `npm run build` command produces a `dist/` folder containing the optimized static SPA.

---

## 4. Apache Virtual Host Configuration

This is the most important step. Go to **Virtualmin → Select `aictig.org` → Server Configuration → Edit Directives** and replace the content with:

```apache
<VirtualHost *:80>
    ServerName aictig.org
    ServerAlias www.aictig.org

    # Redirect all HTTP to HTTPS
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</VirtualHost>

<VirtualHost *:443>
    ServerName aictig.org
    ServerAlias www.aictig.org

    # ─── Document Root (serves the built SPA) ───────────────
    DocumentRoot /home/aictig/public_html/dist

    <Directory /home/aictig/public_html/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride None
        Require all granted

        # SPA routing: serve index.html for all non-file routes
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    # ─── Reverse Proxy: GraphQL API ─────────────────────────
    # Browser requests /wp-graphql → proxied to WordPress backend
    ProxyPass /wp-graphql https://be.aictig.org/index.php?graphql
    ProxyPassReverse /wp-graphql https://be.aictig.org/index.php?graphql

    # ─── Reverse Proxy: Document files ──────────────────────
    # Browser requests /documents/... → proxied to WP uploads
    ProxyPass /documents/ https://be.aictig.org/wp-content/uploads/
    ProxyPassReverse /documents/ https://be.aictig.org/wp-content/uploads/

    # ─── Security Headers ───────────────────────────────────
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set X-XSS-Protection "1; mode=block"

    # ─── Caching for static assets ──────────────────────────
    <LocationMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?|ttf|eot)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </LocationMatch>

    # ─── Gzip compression ───────────────────────────────────
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/css
        AddOutputFilterByType DEFLATE application/javascript application/json
        AddOutputFilterByType DEFLATE image/svg+xml
    </IfModule>

    # ─── SSL (Let's Encrypt — managed by Virtualmin) ────────
    SSLEngine on
    SSLCertificateFile /home/aictig/ssl.cert
    SSLCertificateKeyFile /home/aictig/ssl.key
    SSLCertificateChainFile /home/aictig/ssl.ca

    # ─── Logging ────────────────────────────────────────────
    ErrorLog /home/aictig/logs/error.log
    CustomLog /home/aictig/logs/access.log combined
</VirtualHost>
```

> **Note on SSL paths:** The paths above (`/home/aictig/ssl.cert`, etc.) are defaults for Virtualmin-managed SSL. After requesting a Let's Encrypt certificate (Step 5), Virtualmin will set the correct paths automatically. You can verify them under **Server Configuration → Manage SSL Certificate**.

---

## 5. SSL Certificate (Let's Encrypt via Virtualmin)

1. In Virtualmin, select your domain `aictig.org`
2. Go to **Server Configuration → Manage SSL Certificate → Let's Encrypt**
3. Enter domain names: `aictig.org` and `www.aictig.org`
4. Click **Request Certificate**
5. Enable **Auto-renewal** (checkbox)

Virtualmin will automatically update the SSL paths in your Apache config.

---

## 6. Verify & Restart

```bash
# Test Apache config for syntax errors
sudo apachectl configtest

# Restart Apache
sudo systemctl restart apache2

# Verify the site
curl -I https://www.aictig.org       # should return 200
curl -s https://www.aictig.org/wp-graphql -X POST \
  -H "Content-Type: application/json" \
  -d '{"query":"{ mediaItems(first:1) { nodes { title } } }"}' | head -c 200
# should return GraphQL JSON data
```

---

## 7. Update / Redeploy

When you push new code to GitHub, deploy with a single command:

```bash
cd /home/aictig/public_html && git pull && npm install && npm run build
```

No restart needed — Apache serves the `dist/` folder directly (static files).

### Quick deploy script (optional)

Create `/home/aictig/deploy.sh`:

```bash
#!/bin/bash
set -e
cd /home/aictig/public_html
echo "Pulling latest code..."
git pull origin main
echo "Installing dependencies..."
npm install --production=false
echo "Building..."
npm run build
echo "✓ Deployed successfully at $(date)"
```

Make it executable:

```bash
chmod +x /home/aictig/deploy.sh
```

Run it anytime: `bash /home/aictig/deploy.sh`

---

## Proxy Summary

| Browser URL | Proxied To | Purpose |
|---|---|---|
| `www.aictig.org/wp-graphql` | `be.aictig.org/index.php?graphql` | GraphQL API queries |
| `www.aictig.org/documents/*` | `be.aictig.org/wp-content/uploads/*` | PDF preview & download |
| `www.aictig.org/*` (all other) | Served from `dist/` | React SPA |

The backend domain `be.aictig.org` is **never visible** in the browser — not in the address bar, not in network requests, not in page source.

---

## Troubleshooting

### Site shows default Virtualmin page

Apache is serving from `/home/aictig/public_html` instead of `/home/aictig/public_html/dist`.  
Verify `DocumentRoot` in the VirtualHost config points to `.../dist`.

### 404 on page refresh (e.g. /repository/123)

The SPA rewrite rule is not active. Ensure `mod_rewrite` is enabled:

```bash
sudo a2enmod rewrite && sudo systemctl restart apache2
```

### GraphQL returns 502 or 503

Apache can't reach the backend. Check:

```bash
# Test from the server directly
curl -s https://be.aictig.org/index.php?graphql -X POST \
  -H "Content-Type: application/json" \
  -d '{"query":"{ generalSettings { title } }"}'
```

If this fails, the WordPress backend may be down or blocking the VPS IP.

### Documents not loading (PDF preview/download)

```bash
# Test the proxy route
curl -I https://www.aictig.org/documents/
# Should return a response (even if 403 for directory listing)

# Test from server directly
curl -I https://be.aictig.org/wp-content/uploads/
```

### SSL certificate errors

In Virtualmin: **Server Configuration → Manage SSL Certificate** → verify the cert is valid.  
Re-request if expired: **Let's Encrypt → Request Certificate**.

### Check Apache error logs

```bash
sudo tail -f /home/aictig/logs/error.log
# or
sudo tail -f /var/log/apache2/error.log
```

---

## Firewall

Ensure ports 80 and 443 are open:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload
sudo ufw status
```

---

## Security Checklist

- [x] HTTPS enforced (HTTP → HTTPS redirect)
- [x] Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- [x] Backend domain hidden behind reverse proxy
- [x] No server-side process to manage (pure static files)
- [x] WordPress admin only accessible on `be.aictig.org` (not proxied)
- [x] Firewall configured (only 80/443 open)
