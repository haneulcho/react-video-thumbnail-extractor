import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import dts from 'vite-plugin-dts';
import mkcert from 'vite-plugin-mkcert';
import tsconfigPaths from 'vite-tsconfig-paths';

import packageJson from './package.json';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const siteUrl = 'localhost';

  return {
    plugins: [
      mkcert({
        hosts: [siteUrl],
        savePath: resolve(__dirname, './vite-mkcert'),
        keyFileName: `${siteUrl}-key.pem`,
        certFileName: `${siteUrl}-cert.pem`
      }),
      react(),
      tsconfigPaths(),
      dts({
        include: ['src'],
        insertTypesEntry: true,
        rollupTypes: true
      })
    ],
    server: {
      port: 3031,
      host: siteUrl,
      open: true
    },
    build: {
      emptyOutDir: true,
      copyPublicDir: false,
      outDir: './dist',
      lib: {
        entry: resolve(__dirname, './src/index.ts'),
        name: 'VideoThumbnailExtractor',
        fileName: (format) => `react-video-thumbnail-extractor.${format}.js`
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react-player'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-player': 'ReactPlayer'
          },
          exports: 'named'
        }
      }
    },
    test: {
      globals: true,
      name: packageJson.name,
      dir: './src',
      watch: false,
      environment: 'jsdom',
      setupFiles: ['test-setup.ts'],
      typecheck: { enabled: true }
    }
  };
});
