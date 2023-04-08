import React from "react";
import s from "./Tags.module.css";
const Tags = ({ tagName, onRemoveTag }) => {
  return (
    <div className={s["tag"]}>
      {tagName}
      <button className={s["tag-remove"]} onClick={() => onRemoveTag(tagName)}>
        {"x"}
      </button>
    </div>
  );
};

export default Tags;
