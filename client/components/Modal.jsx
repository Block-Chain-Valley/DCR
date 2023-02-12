import React, { useState } from "react";
import style from "./modal.module.css";

function Modal(props) {
  const [searchTitle, setSearchTitle] = useState("");

  const handleInputChange = (e) => {
    setSearchTitle(e.target.value);
  };

  return (
    <div className={style.bg}>
      <div className={style.modal}>
        <div className={style.modal_search}>
          <h1 className={style.h1}>
            최신 드라마, 영화를 지금 바로 결제하고,<br></br> 안전하게 나의
            영상으로 사용하세요.
          </h1>
          <h2 className={style.h2}>
            저작권 문제 없이, 내가 만든 영상의 소유권을 온전하게 나의것으로.
          </h2>
          <div className={style.searchbar}>
            <span className={style.searchbarcontainer}>
              <input
                id="searchinput"
                className={style.searchinput}
                onChange={handleInputChange}
                // placeholder="영화 제목을 입력하세요"
              ></input>
              <label
                className={`${style.searchinputlabel} ${
                  searchTitle !== "" ? style.searchinputlabeltop : ""
                }`}
                htmlFor="searchinput"
              >
                영상제작물의 제목을 입력하세요.
              </label>
            </span>
            <button className={style.searchbutton}>검색하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
