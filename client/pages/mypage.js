import Credential from "@/components/Credential";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import { movieDataState } from "@/recoil/atoms";
import React from "react";
import { useRecoilValue } from "recoil";

function Mypage(props) {
  const movies = useRecoilValue(movieDataState);

  return (
    <Layout>
      <div className="mypage">
        <div className="sub-header">내가 사용동의 받은 컨텐츠</div>
        <div className="credential-container">
          {movies?.map((e) => {
            return (
              <Credential
                rating={e.vote_average}
                title={e.original_title}
                imgUrl={"https://image.tmdb.org/t/p/w300" + e.poster_path}
                detail={e.overview}
                date={e.release_date}
              ></Credential>
            );
          })}
        </div>
      </div>
      {/* <Loading></Loading> */}
    </Layout>
  );
}

export default Mypage;
