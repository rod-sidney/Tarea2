import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['node_modules'],
        quietDeps: true, /*silenciar advertencias deprecation por la version de bootstrap*/
        silenceDeprecations: ['import'],
      },
    },
  },
});