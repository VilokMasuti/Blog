/* eslint-disable no-undef */
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
