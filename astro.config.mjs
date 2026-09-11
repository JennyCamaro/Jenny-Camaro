// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// GitHub Pages: https://jennycamaro.github.io/Jenny-Camaro/
export default defineConfig({
  site: 'https://jennycamaro.github.io',
  base: '/Jenny-Camaro',
  vite: {
    plugins: [tailwindcss()],
  },
});
