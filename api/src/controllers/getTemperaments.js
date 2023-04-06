const { Temperament } = require("../db");

const getTemperaments = async (req, res) => {
  try {
    const response = await Temperament.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTemperaments;
