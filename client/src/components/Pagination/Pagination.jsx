import React, { useEffect, useState } from "react";
import s from "./Pagination.module.css";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../../redux/action.js";

const Pagination = () => {
  const order = useSelector((state) => state.order);
  const filter= useSelector((state) => state.filter)
  const filterStatus= useSelector((state) => state.filterStatus)
  const dogsFilter = useSelector((state) => state.dogsFilter);
  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(changePage(page));
  }, [page,dispatch]);

  useEffect(() => {
    dispatch(changePage(1));
    setPage(1);
  }, [order,filter,filterStatus,dispatch]);

  const prevHandler = () => {
    if (page !== 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  const nextHandler = () => {
    if (dogsFilter[dogsFilter.length - 1] !== (!filterStatus?order[order.length - 1]: filter[filter.length - 1])) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className={s.container}>
      <button className={s.prev} onClick={prevHandler}>
        &lt; Prev
      </button>
      <button className={s.next} onClick={nextHandler}>
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
