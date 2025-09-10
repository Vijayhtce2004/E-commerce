import express from "express";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import "dotenv/config";
import dbConnet from "./db/dbConnect.js";
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  // origin: ["http://127.0.0.1:5500"],
  origin: ["https://fashion-shop-frontend.vercel.app"],
  methods: "GET, POST,PUT,PATCH,DELETE",
};
// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use("/api/v3", userRouter); // http://localhost:3000/api/v3/register
app.use("/api/v3", productRouter); // http://localhost:3000/api/v3/register
app.use("/api/v3", cartRouter); // http://localhost:3000/api/v3/register
app.use("/api/v3", orderRouter); // http://localhost:3000/api/v3/register

dbConnet()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
