import React, { useEffect, useState } from "react";
import s from "./CardDetail.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
const CardDetail = () => {
  const { id, origin } = useParams();
  const [detail, setDetail] = useState({
    name: "",
    image: "",
    height: "",
    weight: "",
    life_span: "",
    temperaments: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/dogs/${id}?origin=${origin}`
      );

      if (data.hasOwnProperty("origin")) {
        setDetail({
          name: data.name,
          image: data.image,
          height: data.height,
          weight: data.weight,
          temperaments: data.temperament,
          life_span: data.life_span,
        });
      } else {
        let temp = data.Temperaments.map((x) => x.name);
        temp = temp.join(", ");
        setDetail({
          name: data.name,
          image: data.image,
          height: data.height,
          weight: data.weight,
          temperaments: temp,
          life_span: data.life_span,
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div className={s["dog-details"]}>
      <div className={s.dogdet}>
        <img src={detail.image} alt={detail.name} className={s["dog-image"]} />

        <div className={s["dog-stats"]}>
          <h2>
            {origin === "api" ? "ApiId: " : "DbId: "}
            {id}
          </h2>
          <h2>{detail.name}</h2>
          <p>Height: {detail.height} cm</p>
          <p>Weight: {detail.weight} kg</p>
          <p>Lifespan: {detail.life_span}</p>
          <p>Temperaments: {detail.temperaments}</p>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
