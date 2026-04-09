import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
const devPort = Number(process.env.PORT) || 8080;

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: devPort,
    fs: {
      allow: ["./", "./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server, but only for API and health routes
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith("/api") || req.url?.startsWith("/health")) {
          return app(req as any, res as any, next);
        }
        next();
      });
    },
  };
}
