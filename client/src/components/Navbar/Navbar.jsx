import React, { useEffect, useState } from "react";
import s from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getTemperaments,
  getDogApi,
  getDogApiDB,
  getDogDb,
  OrderByName,
  OrderByWeight,
  filterByTemperament,
} from "../../redux/action";
import { Link } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getDogApiDB());
  }, []);
  const [origin, setOrigin] = useState("db + api");

  const temperaments = useSelector((state) => state.temperaments);
  const dataOriginHandler = (e) => {
    const selectValue = e.target.value;
    if (selectValue === "1") {
      dispatch(getDogApiDB());
      setOrigin("db + api");
    } else if (selectValue === "2") {
      dispatch(getDogApi());
      setOrigin("api");
    } else {
      dispatch(getDogDb());
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
    if (selectValue !== "0") dispatch(filterByTemperament(selectValue));
  };

  const handleClick =()=> {
    window.location.reload();
  }

  return (
    <div className={s.navbar}>
      <div className={s.logo} onClick={handleClick}></div>
      <div className={s.selectors}>
        <label htmlFor="alphabetical-order">Name:</label>
        <select id="alphabetical-order" onChange={nameOrderHandler}>
          <option value="order">Order</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <label htmlFor="origin-order">Data Origin:</label>
        <select id="origin-order" onChange={dataOriginHandler}>
          <option value="1">db + api</option>
          <option value="2">api</option>
          <option value="3">db</option>
        </select>
        <label htmlFor="weight-order">Weight:</label>
        <select id="weight-order" onChange={weightOrderHandler}>
          <option value="order">Order</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>

        <label htmlFor="Temperament">Temperament:</label>
        <select id="Temperament" onChange={filterByTemperamentHandler}>
          <option key={0} value={0}>
            {"temperament"}
          </option>
          {temperaments.map((x) => (
            <option key={x.id} value={x.name}>
              {x.name}
            </option>
          ))}
        </select>
        <SearchBar origin={origin} />
        <Link to="/dogForm" className={s["new-dog-button"]}>Nuevo perro</Link>
      </div>
    </div>
  );
};

export default Navbar;
