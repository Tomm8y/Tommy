import express from "express";
import session from "express-session";
import helmet from "helmet";
import cors from "cors";
import { config } from "./config";
import authRouter from "./routes/auth";
import adminRouter from "./routes/admin";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: config.frontendOrigin,
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    name: "owlos.sid",
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: config.nodeEnv === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);

app.listen(config.port, () => {
  console.log(`owl-os backend listening on :${config.port}`);
});
