/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import path  from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/ A
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    resolve: {
      alias: [{
        find: '@', replacement: path.resolve(__dirname, 'src'),
      }],
    },
    plugins: [
      react(),
      VitePWA({
        srcDir: 'src',
        strategies: 'injectManifest',
        injectRegister: null,
        filename: 'service-worker.js',
      }),
      eslintPlugin({ eslintOptions: { cache: false } }),
    ],
    build: {
      outDir: 'build',
      assetsDir: 'static',
      sourcemap: false,
      /*
      FIXME: Temporary disable vizualizer
      rollupOptions: {
        plugins: [
          visualizer({
            filename: resolve(__dirname, 'analyzed.html'),
            template: 'treemap', // sunburst|treemap|network
            sourcemap: false,
          }),
        ],
      }, */
    },
    server: {
      host: process.env.VITE_DEV_HOST || 'localhost',
      port: process.env.VITE_DEV_PORT || 3000,
      open: true,
      fs: {
        // Allow serving files from one level up to the project root
        allow: [
          '..',
        ],
      },
    },
    esbuild: {
      jsxFactory: 'jsx',
      jsxInject: 'import { jsx } from \'@emotion/react\'',
    },
  });
};
