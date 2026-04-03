import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://safe-pay4-u-ai-assistant-1p9c.vercel.app',
        changeOrigin: true
      }
    }
  }
});
