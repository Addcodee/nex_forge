import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5000,
  },

  resolve: {
    alias: {
      app: path.resolve(__dirname, "src/app"),
      shared: path.resolve(__dirname, "src/shared"),
      components: path.resolve(__dirname, "src/components"),
      auth: path.resolve(__dirname, "src/modules/auth"),
      gettingStarted: path.resolve(__dirname, "src/modules/gettingStarted"),
      module: path.resolve(__dirname, "src/modules/module"),
    },
  },
});
