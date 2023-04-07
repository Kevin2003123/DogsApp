import React from 'react'
import {useSelector} from 'react-redux'
import s from './Cards.module.css'
import Card from '../Card/Card.jsx'
import Pagination from '../Pagination/Pagination'
const Cards = () => {

  const dogs = useSelector(state=>state.dogsFilter);
  return (<>
    <div className={s.container}>
    {
      
      dogs.map((x,i)=>{
        if(x.hasOwnProperty('origin')){
          return(<Card key={i} id={x.id} name={x.name} image={x.image} weight={x.weight} temperaments={x.temperament} origin='api'/>)
        }else{
          let temp = x.Temperaments.map(x=>x.name).join(', ');


          return(<Card key={i} id={x.id} name={x.name} image={x.image} weight={x.weight} temperaments={temp} origin='db' />)
        }

       

      })
    }

    
    </div>

    <Pagination className={s.pagination}/>
    </>
  )
}

export default Cards