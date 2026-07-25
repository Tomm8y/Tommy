import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { config } from "../config";

const router = Router();

router.get("/status", requireAuth, (_req, res) => {
  res.json({
    uptimeSeconds: Math.floor(process.uptime()),
    serverTime: new Date().toISOString(),
    environment: config.nodeEnv,
    nodeVersion: process.version,
    sessionCookieName: "owlos.sid",
  });
});

export default router;
