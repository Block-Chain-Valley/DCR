import React from "react";
import style from "./card.module.css";

function Card({ imgUrl, children }) {
  return (
    <div className={style.card}>
      <div className={style.description}>{children}</div>
      <div className={style.picture}>
        <img src={imgUrl}></img>
      </div>
    </div>
  );
}

export default Card;
