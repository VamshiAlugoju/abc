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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors({ origin: "*" }));
const port = 3000;

app.get("/", async (req, res) => {
  console.log();
  res.sendFile(path.join(__dirname, "/pages", "login.html"));
});

app.post("/bikes", verifyToken, async (req, res) => {
  try {
    const isValid = validator().validateBike(req.body);
    if (!isValid.success) {
      return res.status(400).json({ error: isValid.error });
    }
    const bike = await Bike.create(req.body);
    res.status(200).json(bike);
    return;
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
app.post("/signup", async (req, res) => {
  try {
    const { email, username } = req.body;
    if (!email || !username) {
      res.status(400).json({ error: "Email and username are required" });
      return;
    }
    if (!validator().isEmail(email)) {
      res.status(400).json({ error: "Invalid email" });
      return;
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      res.status(409).json({ error: "User already exists please login" });
      return;
    }
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/bikes/:id", verifyToken, async (req, res) => {
  try {
    const bikeId = req.params.id;
    const bike = await Bike.findById(bikeId);
    if (!bike) {
      res.status(404).json({ error: "Bike not found" });
    } else {
      res.status(200).json(bike);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/bikes", verifyToken, async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.status(200).json(bikes);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post("/seed", verifyToken, async (req, res) => {
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

app.post("/send-email", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // await sendEmail(user.email);
    res.status(200).json({ message: "Email sent" });
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
