import React, { useEffect, useState } from "react";
import s from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getTemperaments,
  getDogApiDB,
  OrderByName,
  OrderByWeight,
  filterByTemperament,
  filterDogsApi,
  filterDogsDb,
  filterDogsApiDb,
  setFilter,
} from "../../redux/action";
import { Link } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.order);
  const filterStatus = useSelector((state) => state.filterStatus);
  const allDogs = useSelector((state) => state.allDogs);
  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getDogApiDB());
  }, [dispatch]);

  useEffect(() => {
    dispatch(OrderByName("asc"));
  }, [allDogs, dispatch]);

  useEffect(() => {
    console.log("hola");
    if (filterStatus) {
      const filterStat = document.getElementById("filterBy").value;
      const origin = document.getElementById("origin-order").value;
      const temperament = document.getElementById("Temperament").value;
      console.log(origin);
      if (filterStat === "dataOrigin") {
        if (origin === "1") {
          dispatch(filterDogsApiDb());
        } else if (origin === "2") {
          dispatch(filterDogsApi());
        } else {
          dispatch(filterDogsDb());
        }
      } else {
        dispatch(filterByTemperament(temperament));
      }
    }
  }, [orderState, dispatch, filterStatus]);

  const [origin, setOrigin] = useState("db + api");
  const [order, setOrder] = useState("name");
  const [filter, setFilters] = useState("dataOrigin");

  const temperaments = useSelector((state) => state.temperaments);
  const dataOriginHandler = (e) => {
    const selectValue = e.target.value;
    if (selectValue === "1") {
      dispatch(setFilter(false));
      dispatch(filterDogsApiDb());
      setOrigin("db + api");
    } else if (selectValue === "2") {
      dispatch(setFilter(true));
      dispatch(filterDogsApi());
      setOrigin("api");
    } else {
      dispatch(filterDogsDb());
      dispatch(setFilter(true));
      setOrigin("db");
    }
  };

  const nameOrderHandler = (e) => {
    const selectValue = e.target.value;
    if (selectValue === "asc") dispatch(OrderByName("asc"));
    if (selectValue === "desc") dispatch(OrderByName("desc"));
  };

  const weightOrderHandler = (e) => {
    const selectValue = e.target.value;
    if (selectValue === "asc") dispatch(OrderByWeight("asc"));
    if (selectValue === "desc") dispatch(OrderByWeight("desc"));
  };

  const filterByTemperamentHandler = (e) => {
    const selectValue = e.target.value;
    if (selectValue !== "0") {
      dispatch(setFilter(true));
      dispatch(filterByTemperament(selectValue));
    } else dispatch(setFilter(false));
  };

  const handleClick = () => {
    window.location.reload();
  };

  const orderHandler = (e) => {
    const element = document.getElementById("orderSelected").value;
    console.log(element);
    console.log(e.target.value);
    if (e.target.value === "name") {
      setOrder("name");
      if (element === "asc") dispatch(OrderByName("asc"));
      else dispatch(OrderByName("desc"));
    } else {
      setOrder("weight");
      if (element === "asc") dispatch(OrderByWeight("asc"));
      else dispatch(OrderByWeight("desc"));
    }
  };

  const filterHandler = (e) => {
    if (e.target.value === "dataOrigin") {
      setFilters("dataOrigin");
    } else {
      setFilters("temperament");
    }
  };

  return (
    <div className={s.navbar}>
      <div className={s.logo} onClick={handleClick}></div>
      <div className={s.selectors}>
        <label htmlFor="orderBy">Order by:</label>
        <select id="orderBy" onChange={orderHandler}>
          <option value="name">name</option>
          <option value="weight">weight</option>
        </select>
        <span>:</span>
        <select
          id="orderSelected"
          onChange={order === "name" ? nameOrderHandler : weightOrderHandler}
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <label htmlFor="filterBy">Filter by:</label>
        <select id="filterBy" onChange={filterHandler}>
          <option value="dataOrigin">Data Origin</option>
          <option value="temperament">Temperament</option>
        </select>
        <span>:</span>
        <select
          id="origin-order"
          onChange={dataOriginHandler}
          className={filter === "dataOrigin" ? "" : s.hide}
        >
          <option value="1">db + api</option>
          <option value="2">api</option>
          <option value="3">db</option>
        </select>
        <select
          id="Temperament"
          onChange={filterByTemperamentHandler}
          className={filter === "temperament" ? "" : s.hide}
        >
          <option key={0} value={0}>
            {"All temperaments"}
          </option>
          {temperaments.map((x) => (
            <option key={x.id} value={x.name}>
              {x.name}
            </option>
          ))}
        </select>
        <SearchBar className={s.search} origin={origin} />
      </div>

      <Link to="/dogForm" className={s["new-dog-button"]}>
        Nuevo perro
      </Link>
    </div>
  );
};

export default Navbar;
