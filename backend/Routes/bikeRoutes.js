import express from "express";
import { getBikeById, getBikes } from "../controllers/bike.js";
const route = express.Router();

route.get("/:id", getBikeById);
route.get("/", getBikes);
route.post("/");

export default route;
