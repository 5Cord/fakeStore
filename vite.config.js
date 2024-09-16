import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // Опции CSS модулей
      localsConvention: 'camelCaseOnly',
    },
  },
});
