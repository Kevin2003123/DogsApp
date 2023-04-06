const { Dog, Temperament } = require("../db");

const createDog = async (req, res) => {
  try {
    const {
      name,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
      minLife,
      maxLife,
      temperaments,
    } = req.body;

    const response = await Dog.create({
      name,
      weight: minWeight + " - " + maxWeight,
      height: minHeight + " - " + maxHeight,
      life_span: minLife + " - " + maxLife + " years",
    });
    await response.addTemperaments([...temperaments]);

    const created = await Dog.findByPk(response.id, {
      include: [
        {
          model: Temperament,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });

    res.status(200).json(created);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createDog;
