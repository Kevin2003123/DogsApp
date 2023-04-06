import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getDogApiDB} from '../../redux/action.js'
import s from './Cards.module.css'
import Card from '../Card/Card.jsx'
const Cards = () => {

  const dogs = useSelector(state=>state.dogs);
  return (
    <div className={s.container}>
    {
      
      dogs.map((x,i)=>{
        if(x.hasOwnProperty('origin')){
          return(<Card key={i} name={x.name} image={x.image} weight={x.weight} temperaments={x.temperament} />)
        }else{
          let temp = x.Temperaments.map(x=>x.name).join(', ');


          return(<Card key={i} name={x.name} image={x.image} weight={x.weight} temperaments={temp} />)
        }

       

      })
    }
    </div>
  )
}

export default Cards