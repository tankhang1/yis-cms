import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "no-cache-images", // Custom plugin name
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
            res.setHeader("Cache-Control", "no-store");
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@assets": path.resolve(__dirname, "./src/assets/"),
      "@constants": path.resolve(__dirname, "./src/constants/"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
    },
  },
});
