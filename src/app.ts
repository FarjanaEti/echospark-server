import express, { Application, Request, Response } from "express";
import cors from "cors";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import { categoryRouter } from "./modules/category/category.route";
import { VoteRouter } from "./modules/vote/vote.route";
import { commentRouter } from "./modules/comment/comment.route";
import { reviewRouter } from "./modules/review/review.route";
import { userRouter } from "./modules/user/user.route";
import { ideaRouter } from "./modules/idea/idea.route";
import {aiRouter} from "./modules/ai/ai.route";

const app: Application = express();

// ─── Allowed Origins ────────────────────────
const allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL,
].filter(Boolean);


// ─── Open CORS for SSLCommerz callbacks ─────
const openCors = cors({ origin: "*" });
app.post("/payment/success", openCors, (req, res, next) => next());
app.post("/payment/fail", openCors, (req, res, next) => next());
app.post("/payment/cancel", openCors, (req, res, next) => next());

// ─── Main CORS ───────────────────────────────
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.sslcommerz\.com$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        console.log("Blocked origin:", origin);
        callback(null, false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.set("trust proxy", 1);

// ─── Routes will go here ─────────────────────
app.use("/api/auth/", toNodeHandler(auth));


// ─── Body Parsers ───────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/ideas", ideaRouter);
 app.use("/api/categories", categoryRouter);
 app.use("/api/votes", VoteRouter);
 app.use("/api/comments", commentRouter);
// app.use("/api/payments", paymentRouter);
 app.use("/api/reviews", reviewRouter);

app.use("/api/ai", aiRouter);

// ─── Health Check ────────────────────────────
app.get("/", (req: Request, res: Response) => {
  res.send("EcoSpark Hub API is running 🌱");
});

export default app;