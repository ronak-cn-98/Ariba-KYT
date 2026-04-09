import { Router } from "express";

export const router = Router();

// ...existing code (real routes)...

// If you previously had: router.get("*", ...)
// Use:
router.get("/*rest", (req, res, next) => {
  // ...existing code...
  next();
});

// ✅ FIXED catch-all
router.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
