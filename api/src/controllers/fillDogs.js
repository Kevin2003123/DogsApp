const { Dog } = require("../db");
const getDogs = async (req, res) => {
  try {
    const fillDogs = await Dog.create({
      name: "kevin",
      image: "2",
      weight: "22",
      height: "12",
      life_span: "222",
    });
    await fillDogs.addTemperaments([1, 2, 3]);
    res.status(200).json(fillDogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getDogs;
