import Bike from "../models/Bike.js";
export const getBikeById = async (req, res) => {
  try {
    const bikeId = req.params.id;
    const bike = await Bike.findById(bikeId);
    const bikes = await Bike.find();

    if (!bike) {
      res.status(404).json({ error: "Bike not found" });
    } else {
      return res.render("pages/bikes.ejs", { bikes, data: bike.toJSON() });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getBikes = async (req, res) => {
  try {
    const bikes = await Bike.find();
    return res.render("pages/bikes.ejs", { bikes });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const addBike = async (req, res) => {
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
};
