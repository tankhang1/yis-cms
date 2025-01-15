import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@assets": path.resolve(__dirname, "./src/assets/"),
      "@constants": path.resolve(__dirname, "./src/constants/"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
    },
  },
  preview: {
    headers: {
      "Cache-Control": "no-store", // Disable caching for all served assets
    },
  },
});
