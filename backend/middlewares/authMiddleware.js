import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Authorization token is missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    return next();
  } catch (err) {
    res.status(401).json({ error: "Invalid authorization token" });
  }
};

export default verifyToken;
