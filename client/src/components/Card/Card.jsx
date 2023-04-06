import React from 'react'
import s from './Card.module.css'
const Card = ({ name, image, weight, temperaments }) => {
  return (<div className={s.card}>
    <img src={image} alt={name} />
  
  <div className={s.cardInfo}>
    <h2>{name}</h2>
    <p>Weight: {weight} kg</p>
    <p>Temperaments: {temperaments}</p>
  </div>
</div>
)
}

export default Card