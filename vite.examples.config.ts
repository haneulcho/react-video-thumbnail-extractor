import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const siteUrl = 'localhost';

  return {
    root: resolve(__dirname, './examples'),
    plugins: [
      mkcert({
        hosts: [siteUrl],
        savePath: resolve(__dirname, './vite-mkcert'),
        keyFileName: `${siteUrl}-key.pem`,
        certFileName: `${siteUrl}-cert.pem`
      }),
      react(),
      tsconfigPaths()
    ],
    server: {
      port: 3032,
      host: siteUrl,
      open: true
    }
  };
});
