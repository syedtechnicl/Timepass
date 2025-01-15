import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import userRoute from "./routes/user.js";
import bodyParse from "body-parser";
import todoRouter from "./routes/todo.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();

connectDB();
app.use(express.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Include credentials if needed
  })
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/todo", todoRouter);

// http://localhost:8000/api/v1/user/ route grouping
// http://localhost:8000/api/v1/todo/ route grouping

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Listen At Port ${port}`);
});

// 2:42
