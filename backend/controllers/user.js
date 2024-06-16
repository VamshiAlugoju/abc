import User from "../models/user.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    // service: "Gmail",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "madilyn34@ethereal.email",
      pass: "Esh7wCXPVYuCTxXQNW",
    },
  });

export const getSignup = async (req, res) => {
  return res.render("pages/signup.ejs", { error: null });
};

export const getlogin = async (req, res) => {
  return res.render("pages/login.ejs", { error: null });
};

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("params", req.params);
    console.log("query", req.query);
    console.log("body", req.body);
    if (!email || !password) {
      return res.render("pages/signup.ejs", {
        error: "Email and password are required",
      });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.render("pages/signup.ejs", {
        error: "user already exists",
      });
    }
    const newUser = await User.create({ email, password });
    res.redirect("login");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.render("pages/login.ejs", {
        error: "Invalid email or password",
      });
    }
    if (user.password !== password) {
      return res.render("pages/login.ejs", { error: "Incorrect password" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/bikes");
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const sendMail = async (req, res) => {
  try {
    // const user = await User.findOne({ _id: req.body.userId });

    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }
    await sendEmail('alugojuvamshi@gmail.com');
    res.status(200).json({ message: "Email sent" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export async function sendEmail(email) {
  try {
    const mailoptions = {
      from : 'madilyn34@ethereal.email',
       to : email,
       subject:"abc",
       text : "llsls"
    }

    await transporter.sendMail(mailoptions);
    return Promise.resolve()
  } catch (err) {
    console.log(err);
    return Promise.resolve(err);
  }
}


