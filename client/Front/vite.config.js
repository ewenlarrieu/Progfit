import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    open: "/index.html",
  },
  build: {
    rollupOptions: {
      input: {
        app: "./app.html",
        index: "./index.html",
      },
    },
  },
});
