import Layout from "@/components/Layout";
import { movieDataState, vcState, web3AuthState } from "@/recoil/atoms";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import YouTube from "react-youtube";

import axios from "axios";
import { claimVC } from "@/utils/didCopyright";
import Loading from "@/components/Loading";
import RPC from "@/utils/web3RPC.ts";
import jwt_decode from "jwt-decode";

function Index(props) {
  const router = useRouter();
  const { title } = router.query;
  const movieIndex = Number(title);
  const [videoKey, setVideoKey] = useState("");
  const [second, setSecond] = useState(0);
  const [price, setPrice] = useState(0);
  const [web3auth, setWeb3auth] = useRecoilState(web3AuthState);
  const [vc, setVc] = useRecoilState(vcState);

  const movies = useRecoilValue(movieDataState);
  const [isLoading, setIsLoading] = useState(false);

  const fakeFetch = (delay = 2000) =>
    new Promise((res) => setTimeout(res, delay));

  const getAccounts = async () => {
    if (!web3auth.provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const address = await rpc.getAccounts();
    return address;
  };

  const fakePayment = async () => {
    setIsLoading(true);
    await fakeFetch();
  };

  const getPrivateKey = async (key) => {
    if (!web3auth.provider) {
      console.log("web3auth.provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
    return privateKey;
  };

  const handleButtonClick = () => {
    if (Object.keys(web3auth).length === 0) {
      alert("로그인하세요!");
    }
    fakePayment().then((res) => {
      getAccounts().then((res) => {
        const address = res;
        console.log(address);
        getPrivateKey(address).then((res) => {
          claimVC(address, res, movies[movieIndex].title, second).then(
            (res) => {
              console.log(jwt_decode(res));
              setVc(jwt_decode(res));
              setIsLoading(false);
              router.push("/mypage");
            }
          );
        });
      });
    });
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (isNaN(movieIndex)) router.push("/");
    if (movies[movieIndex]) {
      const floor = Math.floor(movies[movieIndex].vote_average * 100);
      setPrice(floor);
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movies[movieIndex].id}/videos?api_key=2a9e67d2d5f6c1616769c3d72a95da3c`
        )
        .then((res) => {
          console.log(res);
          if (res.data?.results?.length) {
            setVideoKey(res.data.results[0].key);
          }
        })
        .catch((err) => console.log(err));
    }

    console.log(movies[movieIndex]);
  }, [router.isReady]);

  useEffect(() => {
    if (Object.keys(web3auth).length !== 0 && web3auth.constructor !== Object) {
      console.log(web3auth);
    }
  }, [web3auth]);

  return (
    <div>
      <Layout>
        {/* <h1 className="subtitle-h1">Copyright Consensus</h1> */}

        <div className="movie-modal">
          <h2>{movies[movieIndex]?.original_title}</h2>
          <p>
            <span>영화</span>|<span>{movies[movieIndex]?.title}</span>|
            <span>{movies[movieIndex]?.release_date}</span>
          </p>
          <YouTube
            //videoId : https://www.youtube.com/watch?v={videoId} 유튜브 링크의 끝부분에 있는 고유한 아이디
            videoId={videoKey}
            //opts(옵션들): 플레이어의 크기나 다양한 플레이어 매개 변수를 사용할 수 있음.
            //밑에서 더 설명하겠습니다.
            className="movie-video"
            opts={{
              width: "570",
              height: "415",
              playerVars: {
                autoplay: 1, //자동재생 O
                rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
              },
            }}
            //이벤트 리스너
            onEnd={(e) => {
              e.target.stopVideo(0);
            }}
          />

          <div className="movie-description">
            {movies[movieIndex] && (
              <>
                <div>
                  <h3>기본정보</h3>
                  <p>
                    <span>영화제목</span>
                    {movies[movieIndex].original_title}
                  </p>
                  <p>
                    <span>개봉</span>
                    {movies[movieIndex].release_date}
                  </p>
                  <p>
                    <span>평점</span>🌟{movies[movieIndex].vote_average}
                  </p>
                  <p>{movies[movieIndex].overview}</p>
                </div>
                <img
                  alt=""
                  src={
                    "https://image.tmdb.org/t/p/w300" +
                    movies[movieIndex].poster_path
                  }
                ></img>
              </>
            )}
          </div>
          <div className="movie-payment">
            <div className="movie-input">
              <label htmlFor="quantity">
                영상을 사용할 시간(초)을 정해주세요.
              </label>

              <input
                type={"number"}
                id="quantity"
                name="quantity"
                min="1"
                onChange={(e) => setSecond(e.target.valueAsNumber)}
              ></input>
              <span className="movie-sec">sec</span>
            </div>
            <div className="movie-amount">
              <div>
                {movies[movieIndex]?.original_title}의 초당 결제가격은{" "}
                <b>₩{price}</b> 입니다.
              </div>
              {second !== 0 && !isNaN(second) && (
                <>
                  <div className="movie-pay">
                    총 <b>₩{second * price}</b> 을 결제합니다.
                  </div>
                  <button onClick={handleButtonClick}>
                    <b>결제하기</b>
                  </button>
                  {isLoading && (
                    <div className="loading-modal">
                      {" "}
                      <Loading></Loading>{" "}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Index;
