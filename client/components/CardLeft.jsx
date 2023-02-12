import React from "react";
import style from "./cardleft.module.css";

function CardLeft({ imgUrl, children }) {
  return (
    <div className={style.card}>
      <div className={style.picture}>
        <img src={imgUrl}></img>
      </div>
      <div className={style.description}>{children}</div>
    </div>
  );
}

export default CardLeft;
