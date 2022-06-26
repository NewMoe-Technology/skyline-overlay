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
  base: process.env.VITE_BASE_URL || '/skyline/',
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
          // webfonts
          {
            urlPattern: /^https?:\/\/.*\/SmartisanHei.woff2.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'SmartisanHei-fonts-cache',
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
    target: ['chrome90', 'firefox90', 'safari14'],
  },
});
