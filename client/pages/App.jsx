import Card from "@/components/Card";
import CardLeft from "@/components/CardLeft";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import React from "react";

function App(props) {
  return (
    <>
      <div className="">
        <Header></Header>
        <Modal></Modal>
        <Card imgUrl="https://assets.nflxext.com/ffe/siteui/vlv3/862cc171-8df5-418c-886f-2aaf767ae159/2108183d-fee2-43b6-9232-8cf942f0af4b/KR-ko-20230130-popsignuptwoweeks-perspective_alpha_website_large.jpg">
          <h1>사용하고 싶은 영화 검색하기</h1>
          <h3>검색창에 사용하고자 하는 영화, 드라마를 입력하세요.</h3>
        </Card>
        <CardLeft imgUrl="https://assets.nflxext.com/ffe/siteui/vlv3/862cc171-8df5-418c-886f-2aaf767ae159/2108183d-fee2-43b6-9232-8cf942f0af4b/KR-ko-20230130-popsignuptwoweeks-perspective_alpha_website_large.jpg">
          <h1>사용하고 싶은 영화 검색하기</h1>
          <h3>검색창에 사용하고자 하는 영화, 드라마를 입력하세요.</h3>
        </CardLeft>{" "}
        <Card imgUrl="https://assets.nflxext.com/ffe/siteui/vlv3/862cc171-8df5-418c-886f-2aaf767ae159/2108183d-fee2-43b6-9232-8cf942f0af4b/KR-ko-20230130-popsignuptwoweeks-perspective_alpha_website_large.jpg">
          <h1>사용하고 싶은 영화 검색하기</h1>
          <h3>검색창에 사용하고자 하는 영화, 드라마를 입력하세요.</h3>
        </Card>
      </div>
    </>
  );
}

export default App;
