import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src/') },
      { find: '@ui', replacement: resolve(__dirname, './src/shared/ui') },
      { find: '@api', replacement: resolve(__dirname, './src/shared/api') },
      { find: '@providers', replacement: resolve(__dirname, './src/shared/providers') },
      { find: '@hooks', replacement: resolve(__dirname, './src/shared/hooks') },
      { find: '@img', replacement: resolve(__dirname, './src/shared/assets/img') },
      { find: '@icons', replacement: resolve(__dirname, './src/shared/assets/icons') },
      { find: '@libs', replacement: resolve(__dirname, './src/shared/libs') },
      { find: '@pages', replacement: resolve(__dirname, './src/pages/') },
      { find: '@constants', replacement: resolve(__dirname, './src/shared/constants') },
      { find: '@app', replacement: resolve(__dirname, './src/app/') },
      { find: '@shared', replacement: resolve(__dirname, './src/shared/') },
      { find: '@widgets', replacement: resolve(__dirname, './src/widgets/') },
      { find: '@features', replacement: resolve(__dirname, './src/features/') },
      { find: '@entities', replacement: resolve(__dirname, './src/entities/') },
    ],
  },
});
