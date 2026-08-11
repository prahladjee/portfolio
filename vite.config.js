import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures relative asset paths work on GitHub Pages and all free hosts
  build: {
    outDir: 'dist',
  }
});
