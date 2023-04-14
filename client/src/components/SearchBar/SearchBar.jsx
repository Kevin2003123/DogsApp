import React, { useState } from "react";
import s from "./SearchBar.module.css";
import { getDogByName, setFilter } from "../../redux/action";
import { useDispatch } from "react-redux";
const SearchBar = ({ origin }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const clickHandler = () => {
    dispatch(setFilter(true));
    dispatch(getDogByName(origin, search));
  };
  return (
    <div className={`${s.searchBar}`}>
      <input
        type="text"
        placeholder="Buscar"
        value={search}
        onChange={searchHandler}
      />
      <button className={s.searchButton} onClick={clickHandler}></button>
    </div>
  );
};

export default SearchBar;
