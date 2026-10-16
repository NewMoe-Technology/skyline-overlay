import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  base: process.env.VITE_BASE_URL || '/skyline/',
  resolve: {
    alias: {
      '@/': '/src/',
    },
  },
  plugins: [
    svgr({
      svgrOptions: {
        icon: true,
        svgProps: {
          className: 'g-icon',
        },
      },
    }),
    react(),
    analyzer({
      enabled: process.env.ENABLE_ANALYZER === '1',
    }),
    VitePWA({
      // devOptions: {
      //   enabled: true,
      // },
      manifest: {
        name: 'Skyline Overlay',
        short_name: 'Skyline',
        description: 'A modern customizable horizon FFXIV miniparse overlay.',
        icons: [{ src: 'favicon.svg', sizes: 'any' }],
        theme_color: '#ffffff',
      },
      workbox: {
        runtimeCaching: [
          // webfonts
          {
            urlPattern: /^https?:\/\/.*\/.woff2.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 31536000 }, 
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  css: {
    devSourcemap: true,
  },
  build: {
    sourcemap: true,
    emptyOutDir: true,
  },
});
