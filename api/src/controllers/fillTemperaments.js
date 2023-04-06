const axios = require("axios");
const { API_KEY } = process.env;
const fillTemperaments = async (tem) => {
  try {
    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    let arr = [];
    let result = data.map((dogs) => {
      const { temperament } = dogs;

      return temperament;
    });

    result.forEach((x) => {
      if (x) {
        x.split(",").forEach((y) => {
          arr.push(y.trim());
        });
      }
    });

    const temp = [...new Set(arr)].sort().map((x) => {
      return { name: x };
    });
    await tem.bulkCreate(temp);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = fillTemperaments;
