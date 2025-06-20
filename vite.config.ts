/// <reference types="vitest" />

import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from 'vite-plugin-svgr' 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),svgr(), ViteImageOptimizer({
    jpeg: {
      quality: 50,
      progressive: true
    },
    jpg: {
      quality: 50,
      progressive: true
    }
  })],
  base: "./",
  test: {
    globals: true,
  },
  build: {
    sourcemap: true
  }
});
