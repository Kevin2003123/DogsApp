import React,{useEffect, useState} from 'react'
import s from './Pagination.module.css'
import {useSelector, useDispatch} from 'react-redux';
import {changePage} from '../../redux/action.js'
const Pagination = () => {

    const dogs = useSelector(state=>state.dogs);
    const dogsFilter = useSelector(state=>state.dogsFilter);
    const dispatch = useDispatch();
    let[page, setPage]= useState(1);
    useEffect(() => {
        dispatch(changePage(page));
      }, [page]);


      useEffect(() => {
        dispatch(changePage(1));
        setPage(1);
      }, [dogs]);

      const prevHandler = ()=>{
        if(page!==1) setPage(page-1)
      }

      const nextHandler = ()=>{
        if(dogsFilter[dogsFilter.length-1]!== dogs[dogs.length-1])setPage(page+1)
      }

  return (
    <div className={s.container}>
      <button className={s.prev} onClick={prevHandler} >
        &lt; Prev
      </button>
      <button className={s.next} onClick={nextHandler}>
        Next &gt;
      </button>
    </div>
  )
}

export default Pagination