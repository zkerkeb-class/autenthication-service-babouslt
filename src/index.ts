import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import apiRouter from "./routes";
const cors = require("cors");

dotenv.config();
const app: Application = express();

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}`
  )
  .then(() => {
    console.log("Successfully connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Server running on port " + process.env.PORT);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use("/api/", apiRouter);

export default app;
