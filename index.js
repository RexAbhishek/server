import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dbConnect } from "./config/connection.js";
import adminRouter from "./routers/adminRouter.js";
import homeRouter from "./routers/homeRouter.js";
import aboutRouter from "./routers/aboutRouter.js";

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({ message: "Hello from Server ✋🏻" });
});

const PORT = process.env.PORT || 3010;

console.log("MONGO URL: ", process.env.MONGO_URL);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT} 👍🏻`);
});

dbConnect().then(() => {
  console.log(`Successfully connected to mongodb database! 👍🏻`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.use("/admin", adminRouter);
app.use("/home", homeRouter);
app.use("/about", aboutRouter);
