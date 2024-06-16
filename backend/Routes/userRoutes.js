import express from "express";
import {
  signup,
  login,
  getSignup,
  getlogin,
  sendMail,
} from "../controllers/user.js";
import verifyToken from "../middlewares/authMiddleware.js"
const route = express.Router();

route.get("/login", getlogin);
route.get("/signup", getSignup);
route.post("/login", login);
route.post("/signup", signup);
route.post("/sendMail",verifyToken, sendMail);

export default route;
