import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import corsOptions from "./config/cors.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { routeLogger } from "./middlewares/routeLogger.middleware";
import router from "./routes";

// helper to auto-catch errors on async handlers
const wrapAsync = (fn: any) => (req: any, res: any, next: any) => Promise.resolve(fn(req, res, next)).catch(next);

export const app: Express = express();

// middlewares globaux
app.use(routeLogger);
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1", wrapAsync(router));

// gestion des erreurs
app.use(errorHandler);
