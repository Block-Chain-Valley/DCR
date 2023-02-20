import React, { useEffect, useState } from "react";
import style from "./modal.module.css";
import useDebounce from "@/hooks/useDebounce";

import searchMoviesApi from "@/modules/api";
import Image from "next/image";
import Link from "next/link";
import { movieDataState } from "@/recoil/atoms";
import { useRecoilState } from "recoil";
import axios from "axios";

function Modal(props) {
  const [searchTitle, setSearchTitle] = useState("");
  const [movies, setMovies] = useRecoilState(movieDataState);
  const [noResult, setNoResult] = useState(false);

  const debounceValue = useDebounce(searchTitle, 300);

  const getMovies = async () => {};

  useEffect(() => {
    const getPosts = async () => {
      const res = await searchMoviesApi({
        query: debounceValue,
        api_key: "2a9e67d2d5f6c1616769c3d72a95da3c",
      });
      console.log(res);
      if (res.data?.results) {
        setMovies(res.data.results);
        if (res.data.results.length === 0) {
          setNoResult(true);
        } else {
          setNoResult(false);
        }
      }
    };
    if (debounceValue) getPosts();
  }, [debounceValue]);

  const handleInputChange = (e) => {
    console.log(e.target.value);
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
              <div
                className={`${style.searchcontent} ${
                  searchTitle !== "" ? "" : "hide"
                }`}
              >
                {noResult && (
                  <div className={style.nocontent}>
                    <span>일치하는 영상이 없습니다.</span>
                  </div>
                )}
                {movies?.map((e, i) => {
                  // let title = e.title.replace(/<[^>]*>?/g, "");

                  return (
                    <Link key={e.Link} href={"/movie?title=" + i}>
                      <div className={style.searchitem}>
                        <img
                          alt=""
                          src={
                            "https://image.tmdb.org/t/p/w300" + e.poster_path
                          }
                          width="50"
                          height="50"
                        ></img>
                        <div
                        // dangerouslySetInnerHTML={{ __html: e.title }}
                        >
                          {e.original_title}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </span>
            <button className={style.searchbutton}>검색하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
