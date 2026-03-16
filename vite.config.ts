import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://ucdp-backend.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      "/local": {
        target: "https://localhost:3000",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
