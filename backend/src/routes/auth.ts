import { Router } from "express";
import bcrypt from "bcryptjs";
import { config } from "../config";

const router = Router();

// Simple in-memory throttle. Resets on server restart and is per-process,
// not per-IP/session — fine for a single small deployment, not a substitute
// for real rate limiting at scale.
let failedAttempts = 0;
const MAX_ATTEMPTS = 5;

router.post("/owl", async (req, res) => {
  const { password } = req.body ?? {};

  if (failedAttempts >= MAX_ATTEMPTS) {
    res.status(429).json({ success: false, message: "Too many attempts. Try again later." });
    return;
  }

  if (typeof password !== "string" || password.length === 0) {
    res.status(400).json({ success: false, message: "Password is required." });
    return;
  }

  const matches = await bcrypt.compare(password, config.adminPasswordHash);

  if (!matches) {
    failedAttempts += 1;
    res.status(401).json({ success: false, message: "Incorrect password. Permission denied." });
    return;
  }

  failedAttempts = 0;
  req.session.isAdmin = true;
  res.json({ success: true, message: "Access granted. Welcome, root." });
});

router.get("/status", (req, res) => {
  res.json({ authenticated: Boolean(req.session.isAdmin) });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("owlos.sid");
    res.json({ success: true });
  });
});

export default router;
