import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import htmlEnv from 'vite-plugin-html-env';
import { VitePWA as pwa } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  base: process.env.VITE_BASE_URL || '/',
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
    htmlEnv(process.env),
    pwa({
      manifest: {
        name: 'Skyline Overlay',
        short_name: 'Skyline',
        description: 'A modern customizable horizon FFXIV miniparse overlay.',
        icons: [{ src: 'favicon.svg', sizes: 'any' }],
      },
      workbox: {
        runtimeCaching: [
          // google fonts css
          {
            urlPattern: /^https?:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'googleapis-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 604800 }, // only one css loaded
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // google fonts webfonts
          {
            urlPattern: /^https?:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 1000, maxAgeSeconds: 31536000 }, // google's css has 600+ files
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // misans webfonts
          {
            urlPattern: /^https?:\/\/.*\/fonts\/misans-.*.woff2.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'misans-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 31536000 }, // misans only has 3 files
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/scss/variables.scss';`,
      },
    },
  },
  build: {
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      plugins: [visualizer()],
    },
    target: ['chrome87', 'firefox78', 'safari14'],
  },
});
