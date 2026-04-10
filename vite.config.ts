import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

const devPort = Number(process.env.PORT) || 8080;

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/Ariba-KYT/" : "/",   // 🔥 CRITICAL FIX

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

  plugins: [
    react(),
    mode === "development" && expressPlugin(), // 🔥 ONLY run in dev
  ].filter(Boolean),

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
    apply: "serve",
    configureServer(server) {
      const app = createServer();

      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith("/api") || req.url?.startsWith("/health")) {
          return app(req as any, res as any, next);
        }
        next();
      });
    },
  };
}
