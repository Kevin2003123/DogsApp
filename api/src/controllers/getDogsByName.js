const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");
const { Sequelize } = require("sequelize");

const getDogsByName = async (req, res) => {
  const { origin, dogName } = req.query;

  try {
    if (origin === "api") {
      const { data } = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      let RE = new RegExp("^" + dogName, "i");

      const filterArr = data.filter((x) => RE.test(x.name));

      const response = filterArr.map((x) => {
        const { id, image, name, height, weight, Temperament, life_span } = x;
        return {
          id,
          image: image.url,
          name,
          height: height.metric,
          weight: weight.metric,
          Temperament,
          life_span,
          origin: "api",
        };
      });
      if (response.length > 0) res.status(200).json(response);
      else res.status(404).json("no se encontraron ninguna coincidencia");
    } else if (origin === "db") {
      const response2 = await Dog.findAll({
        where: {
          name: {
            [Sequelize.Op.like]: dogName + "%",
          },
        },
        include: [
          {
            model: Temperament,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      });
      if (response2.length > 0) res.status(200).json(response2);
      else res.status(404).json("no se encontraron ninguna coincidencia");
    } else {
      const { data } = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      let RE = new RegExp("^" + dogName, "i");

      const filterArr = data.filter((x) => RE.test(x.name));

      const response = filterArr.map((x) => {
        const { id, image, name, height, weight, Temperament, life_span } = x;
        return {
          id,
          image: image.url,
          name,
          height: height.metric,
          weight: weight.metric,
          Temperament,
          life_span,
          origin: "api",
        };
      });

      const response2 = await Dog.findAll({
        where: {
          name: {
            [Sequelize.Op.like]: dogName + "%",
          },
        },
        include: [
          {
            model: Temperament,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      });

      if (response.length > 0 || response2.length > 0)
        res.status(200).json([...response, ...response2]);
      else res.status(404).json("Not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getDogsByName;
