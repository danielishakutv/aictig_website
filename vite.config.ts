import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/wp-graphql': {
        target: 'https://be.aictig.org',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wp-graphql/, '/index.php?graphql'),
      },
      '/documents': {
        target: 'https://be.aictig.org',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/documents/, '/wp-content/uploads'),
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
  },
});
