import Image from "next/image";
import React from "react";
import style from "./card.module.css";

function Card({ imgUrl, children }) {
  return (
    <div className={style.card}>
      <div className={style.description}>{children}</div>
      <div className={style.picture}>
        <Image width={500} height={280} src={imgUrl}></Image>
      </div>
    </div>
  );
}

export default Card;
