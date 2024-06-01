import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  bikeType: {
    type: String,
    required: false,
  },
  ageRange: {
    type: [String],
    required: false,
  },
  brand: {
    type: String,
    required: false,
  },
  numberOfSpeeds: {
    type: Number,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  wheelSize: {
    type: String,
    required: false,
  },
  modelNumber: {
    type: String,
    required: false,
  },
});

const Bike = mongoose.model("Bike", bikeSchema);

export default Bike;
