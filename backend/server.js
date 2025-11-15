import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Router from "./routes/expense.route.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
  mongoose
    .connect(process.env.URI)
    .then(() => {
      console.log(`MongoDB Connected Successfully`);
    })
    .catch((error) => {
      console.log(error);
    });
});
app.use("/", Router);
