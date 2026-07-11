// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // শুধুমাত্র WalletConnect + ethers এর জন্য polyfill
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis', // WalletConnect এর জন্য
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({ buffer: true }), // buffer fix
      ],
    },
  },

  resolve: {
    alias: {
      // ethers + WalletConnect এর জন্য
      buffer: 'buffer',
      process: 'process/browser',
    },
  },

  // MPEG অডিও ফাইল
  assetsInclude: ['**/*.mpeg'],
});