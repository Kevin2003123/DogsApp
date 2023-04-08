import React from "react";
import s from "./Landing.module.css";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div className={s.background}>
      <div className={s.overlay}>
        <h1>Welcome</h1>
        <h2>to the dogs app</h2>
        <Link to="/home" className={s.button}>
          Home
        </Link>
      </div>
      <footer>Develop by Kevin Fangio Reyes López</footer>
    </div>
  );
};

export default Landing;
