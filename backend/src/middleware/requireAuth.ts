import type { RequestHandler } from "express";

export const requireAuth: RequestHandler = (req, res, next) => {
  if (req.session?.isAdmin) {
    next();
    return;
  }
  res.status(401).json({ success: false, message: "Not authenticated." });
};
