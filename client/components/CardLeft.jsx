import Image from "next/image";
import React from "react";
import style from "./cardleft.module.css";

function CardLeft({ imgUrl, children }) {
  return (
    <div className={style.card}>
      <div className={style.picture}>
        <Image height={280} width={500} src={imgUrl}></Image>
      </div>
      <div className={style.description}>{children}</div>
    </div>
  );
}

export default CardLeft;
