/**
 * Production server for AICTiG website.
 *
 * Serves the Vite-built SPA from dist/ and proxies WordPress API
 * requests internally so Apache never has to proxy to itself.
 *
 * Apache only needs:  ProxyPass / http://localhost:3001/
 */
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── WordPress backend ────────────────────────────────────────────
// be.aictig.org resolves to the server's own IP via /etc/hosts
// (77.237.243.210) so the connection stays local — no Cloudflare
// round-trip, no SNI mismatch.
const WP_BACKEND = 'https://be.aictig.org';

// ─── GraphQL proxy: /wp-graphql → WordPress WPGraphQL ────────────
app.use('/wp-graphql', createProxyMiddleware({
  target: WP_BACKEND + '/index.php?graphql',
  changeOrigin: true,
  secure: false,
  ignorePath: true,
}));

// ─── Documents proxy: /documents/* → wp-content/uploads/* ────────
app.use('/documents', createProxyMiddleware({
  target: WP_BACKEND,
  changeOrigin: true,
  secure: false,
  pathRewrite: { '^/': '/wp-content/uploads/' },
}));

// ─── Matomo analytics proxy: /m/* → analytics.aictig.org ─────────
// Proxying through the main domain avoids ad-blocker interference.
const MATOMO_BACKEND = 'https://analytics.aictig.org';

app.use('/m/matomo.js', createProxyMiddleware({
  target: MATOMO_BACKEND + '/matomo.js',
  changeOrigin: true,
  secure: false,
  ignorePath: true,
}));

app.use('/m/matomo.php', createProxyMiddleware({
  target: MATOMO_BACKEND + '/matomo.php',
  changeOrigin: true,
  secure: false,
  ignorePath: false,
  pathRewrite: { '^/m/matomo.php': '/matomo.php' },
}));

// ─── Static files from Vite build ────────────────────────────────
app.use(express.static(path.join(__dirname, 'dist')));

// ─── SPA fallback (client-side routing) ──────────────────────────
app.get('*', (req, res) => {
  // Don't serve index.html for missing static assets
  if (/\.\w+$/.test(req.path)) {
    return res.status(404).end();
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`AICTiG server running on http://0.0.0.0:${PORT}`);
});
