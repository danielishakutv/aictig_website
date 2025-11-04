# AICTiG Website - VPS Deployment Guide

## Server Setup for /home/aictig/public_html

### Prerequisites
- VPS with root/sudo access
- Webmin installed
- Domain `aictig.org` pointing to your server IP
- Node.js 18+ installed

---

## Step-by-Step Deployment

### 1. Prepare Server Directories

SSH into your VPS or use Webmin's terminal:

```bash
# Create necessary directories
sudo mkdir -p /home/aictig/public_html
sudo mkdir -p /home/aictig/logs

# Set proper ownership (replace 'aictig' with actual user if different)
sudo chown -R aictig:aictig /home/aictig

# Navigate to deployment directory
cd /home/aictig/public_html
```

### 2. Install Node.js (if not already installed)

```bash
# Check current version
node -v

# If Node.js is not installed or version < 18:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node -v
npm -v
```

### 3. Clone Repository

```bash
cd /home/aictig/public_html

# If directory is not empty, remove contents first:
# rm -rf *

# Clone the repository
git clone https://github.com/danielishakutv/aictig_website.git .

# Or if already cloned, pull latest changes:
git pull origin main
```

### 4. Install Dependencies

```bash
# Install project dependencies
npm install

# This will install all packages from package.json
# Should take 1-2 minutes
```

### 5. Build the Production Bundle

```bash
# Build optimized production files
npm run build

# This creates the dist/ folder with optimized assets
# Build time: ~5-10 seconds
```

### 6. Install PM2 Process Manager

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 -v
```

### 7. Start Application with PM2

```bash
# Copy ecosystem config (should already be in repo)
# The ecosystem.config.js file is already in the root

# Start the application
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs aictig-website

# Monitor in real-time
pm2 monit
```

### 8. Configure PM2 to Auto-Start on Server Reboot

```bash
# Save current PM2 process list
pm2 save

# Generate startup script (run the command PM2 outputs)
pm2 startup

# Example output will be something like:
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u aictig --hp /home/aictig
# Copy and run that command
```

### 9. Configure Web Server (Choose Apache OR Nginx)

#### Option A: Apache Configuration (if using Apache)

1. **Via Webmin:**
   - Navigate to: **Servers → Apache Webserver**
   - Click **Create virtual host**
   - Set:
     - **Document Root**: `/home/aictig/public_html`
     - **Server Name**: `aictig.org`
     - **Server Aliases**: `www.aictig.org`
   
2. **Enable required modules:**
   ```bash
   sudo a2enmod proxy
   sudo a2enmod proxy_http
   sudo a2enmod rewrite
   sudo a2enmod headers
   sudo systemctl restart apache2
   ```

3. **Copy .htaccess to document root:**
   ```bash
   cp /home/aictig/public_html/.htaccess /home/aictig/public_html/.htaccess
   ```

4. **Allow .htaccess overrides** in Apache virtual host:
   - In Webmin: Edit the virtual host
   - Add under Directory section:
     ```apache
     <Directory /home/aictig/public_html>
         AllowOverride All
         Require all granted
     </Directory>
     ```

#### Option B: Nginx Configuration (if using Nginx)

1. **Create site configuration:**
   ```bash
   sudo cp /home/aictig/public_html/nginx-aictig.conf /etc/nginx/sites-available/aictig.org
   ```

2. **Enable the site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/aictig.org /etc/nginx/sites-enabled/
   ```

3. **Test configuration:**
   ```bash
   sudo nginx -t
   ```

4. **Reload Nginx:**
   ```bash
   sudo systemctl reload nginx
   ```

### 10. Install SSL Certificate (Let's Encrypt)

#### Via Certbot (Recommended):

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot

# For Apache:
sudo apt-get install python3-certbot-apache
sudo certbot --apache -d aictig.org -d www.aictig.org

# For Nginx:
sudo apt-get install python3-certbot-nginx
sudo certbot --nginx -d aictig.org -d www.aictig.org

# Follow the prompts to:
# 1. Enter email address
# 2. Agree to terms
# 3. Choose to redirect HTTP to HTTPS (recommended: Yes)
```

#### Via Webmin Let's Encrypt Module:

1. **Webmin → Un-used Modules → Let's Encrypt**
2. Click **Request Certificate**
3. Enter domains: `aictig.org, www.aictig.org`
4. Choose web server (Apache/Nginx)
5. Click **Request**

### 11. Test the Deployment

```bash
# Check if app is running on port 3001
curl http://localhost:3001

# Check if domain resolves
curl https://aictig.org

# View PM2 status
pm2 status

# View logs
pm2 logs aictig-website --lines 50
```

### 12. Verify Other Sites Still Work

```bash
# List all virtual hosts
# Apache:
apache2ctl -S

# Nginx:
sudo nginx -T | grep server_name
```

Visit your other websites to ensure they're still functioning.

---

## Maintenance Commands

### Update the Website

```bash
cd /home/aictig/public_html

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Rebuild
npm run build

# Restart PM2
pm2 restart aictig-website

# Or reload without downtime
pm2 reload aictig-website
```

### View Logs

```bash
# Real-time logs
pm2 logs aictig-website

# Last 100 lines
pm2 logs aictig-website --lines 100

# Error logs only
pm2 logs aictig-website --err

# Clear logs
pm2 flush
```

### Monitor Performance

```bash
# Real-time monitoring
pm2 monit

# Detailed info
pm2 info aictig-website

# Resource usage
pm2 list
```

### Stop/Start/Restart

```bash
# Stop
pm2 stop aictig-website

# Start
pm2 start aictig-website

# Restart
pm2 restart aictig-website

# Reload (0-downtime)
pm2 reload aictig-website

# Delete from PM2
pm2 delete aictig-website
```

---

## Troubleshooting

### Port 3001 Already in Use

```bash
# Find process using port 3001
sudo lsof -i :3001

# Kill the process
sudo kill -9 <PID>

# Restart PM2
pm2 restart aictig-website
```

### PM2 App Crashes

```bash
# View error logs
pm2 logs aictig-website --err --lines 50

# Check app status
pm2 info aictig-website

# Restart with fresh logs
pm2 delete aictig-website
pm2 start ecosystem.config.js
```

### SSL Certificate Issues

```bash
# Renew certificate manually
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run

# Check certificate expiry
sudo certbot certificates
```

### Site Not Loading

```bash
# Check if Node.js app is running
curl http://localhost:3001

# Check web server status
# Apache:
sudo systemctl status apache2

# Nginx:
sudo systemctl status nginx

# Check web server error logs
# Apache:
sudo tail -f /var/log/apache2/error.log

# Nginx:
sudo tail -f /var/log/nginx/error.log
```

---

## Firewall Configuration

Ensure ports are open:

```bash
# Check firewall status
sudo ufw status

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Reload firewall
sudo ufw reload
```

---

## Performance Optimization

### Enable Caching (Optional)

Add to Nginx config:
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Enable HTTP/2 (Already in nginx config)

Verify HTTP/2 is working:
```bash
curl -I --http2 https://aictig.org
```

---

## Security Checklist

- ✅ HTTPS enabled with valid SSL certificate
- ✅ HTTP redirects to HTTPS
- ✅ Firewall configured (ports 80, 443 open)
- ✅ Security headers configured (X-Frame-Options, etc.)
- ✅ Node.js app runs as non-root user
- ✅ PM2 configured for auto-restart
- ✅ Regular backups of /home/aictig directory

---

## Quick Reference

| Task | Command |
|------|---------|
| Check app status | `pm2 status` |
| View logs | `pm2 logs aictig-website` |
| Restart app | `pm2 restart aictig-website` |
| Update code | `cd /home/aictig/public_html && git pull && npm install && npm run build && pm2 reload aictig-website` |
| View website | `https://aictig.org` |
| Test local app | `curl http://localhost:3001` |

---

## Support

If you encounter issues:

1. Check PM2 logs: `pm2 logs aictig-website`
2. Check web server logs (Apache/Nginx error logs)
3. Verify domain DNS points to correct IP
4. Ensure port 3001 is not blocked by firewall
5. Test that other sites are still working

For major issues, you can always:
```bash
# Stop the PM2 app
pm2 stop aictig-website

# This won't affect other sites on your server
```
