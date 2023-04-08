import React from "react";
import s from "./Card.module.css";
import { Link } from "react-router-dom";
const Card = ({ id, name, image, weight, temperaments, origin }) => {
  return (
    <div className={s.card}>
      <img src={image} alt={name} />

      <div className={s.cardInfo}>
        <h2>
          <Link to={`/dog/detail/${id}/${origin}`}>{name} </Link>
        </h2>
        <p>Weight: {weight} kg</p>
        <p>Temperaments: {temperaments}</p>
      </div>
    </div>
  );
};

export default Card;
