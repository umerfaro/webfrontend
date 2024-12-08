import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://webbackend-production-43d2.up.railway.app",
      "/uploads/": "https://webbackend-production-43d2.up.railway.app",
    },
  },
});
