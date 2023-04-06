const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");

const getDogByIdRace = async (req, res) => {
  const { idRaza } = req.params;
  const { origin } = req.query;

  try {
    if (origin === "api") {
      const result = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      const detail = result.data.filter((x) => x.id === Number(idRaza))[0];
      const { id, image, name, height, weight, Temperament, life_span } =
        detail;
      res.status(200).json({
        id,
        image: image.url,
        name,
        height: height.metric,
        weight: weight.metric,
        Temperament,
        life_span,
        origin: 'api'
      });
    } else {
      const result2 = await Dog.findByPk(Number(idRaza), {
        include: [
          {
            model: Temperament,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      });

      res.status(200).json(result2);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getDogByIdRace;
