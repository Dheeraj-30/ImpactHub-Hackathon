import mongoose from "mongoose";
import NgoModel from "../models/NgoModel.js";

const NgoDetail = async (req, res) => {
  const location = req.query.location;

  try {
    let filter = {};

    if (location && location.trim() !== "") {
      filter.location = { $regex: location, $options: "i" };
    }

    const ngos = await NgoModel.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: ngos.length,
      data: ngos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching NGOs",
    });
  }
};

export { NgoDetail };
