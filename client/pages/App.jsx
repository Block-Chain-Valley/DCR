import Card from "@/components/Card";
import CardLeft from "@/components/CardLeft";
import Modal from "@/components/Modal";
import React from "react";
import ironman from "@/public/assets/ironman.png";
import review from "@/public/assets/아이언맨영화리뷰.png";
import Image from "next/image";

function App(props) {
  return (
    <>
      <div className="">
        <Modal></Modal>
        <Card imgUrl="https://assets.nflxext.com/ffe/siteui/vlv3/862cc171-8df5-418c-886f-2aaf767ae159/2108183d-fee2-43b6-9232-8cf942f0af4b/KR-ko-20230130-popsignuptwoweeks-perspective_alpha_website_large.jpg">
          <h1>1. 사용하고 싶은 영상 검색하기</h1>
          <h3>검색창에 사용하고자 하는 영화, 드라마를 입력하세요.</h3>
        </Card>
        <CardLeft imgUrl={ironman}>
          <h1>2. 영상에서 사용할 부분 정하고, 결제하기</h1>
          <h3>사용할 부분을 초단위로 입력하고, 결제하세요.</h3>
        </CardLeft>{" "}
        <Card imgUrl={review}>
          <h1>3. 나의 영상에 당당하게 사용하기</h1>
          <h3>다운받은 영상에 검증가능한 증명서를 포함시켜 업로드하세요. </h3>
        </Card>
      </div>
    </>
  );
}

export default App;
