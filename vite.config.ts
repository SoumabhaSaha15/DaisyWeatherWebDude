// https://vite.dev/config/
import path from 'node:path';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from "vite";
import { devtools } from "@tanstack/devtools-vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const targetUrl = env.VITE_OW_URL;
  return {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    plugins: [
      devtools({
        enhancedLogs: { enabled: true },
        logging: true,
        removeDevtoolsOnBuild: true,
      }),
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'prompt',
        devOptions: { enabled: false },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api.openweathermap\.org\/.*$/,
              handler: 'NetworkOnly'
            },
            {
              urlPattern: /\.(jpg|jpeg|png|gif|svg|ico)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
                }
              }
            }
          ],
        },
        injectRegister: 'auto',
        manifest: {
          name: 'Daisy Weather',
          short_name: 'weather-app',
          description: 'A weather app built with React, Vite, and Tailwind CSS and daisy-ui. -Soumabha Saha',
          theme_color: '#00000000',
          icons: [{
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png"
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }]
        }
      })
    ],
    server: {
      port: 4000,
      proxy: {
        "/api": {
          target: targetUrl,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
        '/icon': 'https://openweathermap.org'
      },
    },
  };
})