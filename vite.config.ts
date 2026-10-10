import { defineConfig } from 'vite';

export default defineConfig({
  // Allows a deployment below a path while keeping import.meta.env.BASE_URL correct.
  base: process.env.VITE_BASE_PATH ?? '/',
});
