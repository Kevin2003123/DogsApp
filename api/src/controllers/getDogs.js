const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");
const getDogs = async (req, res) => {
  const { origin } = req.query;
  console.log("llegue");
  try {
    if (origin === "api") {
      const { data } = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );

      const result = data.map((dogs) => {
        const { id, image, name, temperament, weight } = dogs;

        return {
          id,
          image: image.url,
          name,
          temperament,
          weight: weight.metric,
          origin: "api",
        };
      });
      res.status(200).json(result);
    } else if (origin === "db") {
      const result2 = await Dog.findAll({
        attributes: { exclude: ["height", "life_span"] },
        include: [
          {
            model: Temperament,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      });

      res.status(200).json(result2);
    } else {
      const result3 = await Dog.findAll({
        attributes: { exclude: ["height", "life_span"] },
        include: [
          {
            model: Temperament,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      });

      const { data } = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      const result4 = data.map((dogs) => {
        const { id, image, name, temperament, weight } = dogs;

        return {
          id,
          image: image.url,
          name,
          temperament,
          weight: weight.metric,
          origin: "api",
        };
      });

      res.status(200).json([...result3, ...result4]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getDogs;
