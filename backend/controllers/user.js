import User from "../models/user.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
// const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: "your_email@gmail.com",
//       pass: "your_app_password",
//     },
//   });

export const getSignup = async (req, res) => {
  return res.render("pages/signup.ejs");
};

export const getlogin = async (req, res) => {
  return res.render("pages/login.ejs");
};

export const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    console.log("params", req.params);
    console.log("query", req.query);
    console.log("body", req.body);
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
      return res
        .status(400)
        .json({ error: "user already exists", user: existingUser.toJSON() });
    }
    const newUser = await User.create(req.body);
    res.redirect("login");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    if (user.password !== password) {
      return res.status(400).json({ error: "incorrect password" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.redirect("/bikes");
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const sendMail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await sendEmail(user.email);
    res.status(200).json({ message: "Email sent" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

async function sendEmail(email) {
  try {
  } catch (err) {
    console.log(err);
    return Promise.resolve(err);
  }
}
