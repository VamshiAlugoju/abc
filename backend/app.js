import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import Bike from "./models/Bike.js";
import User from "./models/user.js";
import verifyToken from "./middlewares/authMiddleware.js";
import { connectToDB } from "./config/dbConfig.js";
import bikes from "./utils/data.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";
import userRoutes from "./Routes/userRoutes.js";
import bikeRoutes from "./Routes/bikeRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({ origin: "*" }));
app.use(cookieParser());

const port = 3000;

app.use("/user", userRoutes);
app.use("/bikes", verifyToken, bikeRoutes);

app.get("/", async (req, res) => {
  return res.redirect("user/login");
});

app.get("/seed", async (req, res) => {
  try {
    const data = await Bike.find();
    if (data.length >= bikes.length) {
      res.send({ message: "hello" });
      return;
    }
    const bikeDocs = await Bike.create(bikes);

    res.status(200).json(bikeDocs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

async function start() {
  try {
    await connectToDB();

    app.listen(port, () => {
      console.log("Server started on port 3000");
    });
  } catch (err) {
    console.log(err);
  }
}

start();

function validator() {
  return {
    isEmail: (email) => {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      );
    },
    validateBike: (payload) => {
      const requiredFields = [
        "name",
        "price",
        "description",
        "bikeType",
        "ageRange",
        "brand",
        "numberOfSpeeds",
        "color",
        "wheelSize",
        "modelNumber",
        "image",
      ];
      const missingFields = requiredFields.filter(
        (field) => !payload.hasOwnProperty(field)
      );
      if (missingFields.length > 0) {
        return {
          error: `Missing required fields: ${missingFields.join(", ")}`,
          success: false,
        };
      }
      if (typeof payload.price !== "number" || isNaN(payload.price)) {
        return {
          error: "Price must be a number",
          success: false,
        };
      }
      if (
        typeof payload.numberOfSpeeds !== "number" ||
        isNaN(payload.numberOfSpeeds)
      ) {
        return {
          error: "Number of speeds must be a number",
          success: false,
        };
      }
      const validAgeRange = ["Child", "Youth", "12+", "Adult"];
      if (!validAgeRange.includes(payload.ageRange)) {
        return {
          error: "Age range must be one of: Child, Youth, 12+, Adult",
          success: false,
        };
      }
      const validBikeType = ["Road", "Mountain", "Hybrid", "Cruiser", "Gravel"];
      if (!validBikeType.includes(payload.bikeType)) {
        return {
          error:
            "Bike type must be one of: Road, Mountain, Hybrid, Cruisers, Gravel",
          success: false,
        };
      }
      if (typeof payload.color !== "string") {
        return {
          error: "Color must be a string",
          success: false,
        };
      }
      if (typeof payload.wheelSize !== "string") {
        return {
          error: "Wheel size must be a string",
          success: false,
        };
      }
      if (typeof payload.modelNumber !== "string") {
        return {
          error: "Model number must be a string",
          success: false,
        };
      }
      if (typeof payload.image !== "string") {
        return {
          error: "Image must be a valid URL",
          success: false,
        };
      }
      return { success: true };
    },
  };
}
