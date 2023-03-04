import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // proxy for the server to be separate
    // express when we access that api endpoint it will listen to 4000
    proxy: {
      '/api/': 'http://localhost:4000/',
    },
  },
  plugins: [react()],
});
