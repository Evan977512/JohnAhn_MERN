import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  // landing page에 도착하자마자 아래 코드를 실행한다는 뜻.
  // axios.get('/api/hello')는 GET리퀘스트를 '/api/hello' endpoint로 서버에다 보낸다
  // response는 서버에서 돌아온 데이터이다.
  // client와 server의 포트가 같아야 하기 때문에 임시로 http://localhost:3000/api/hello 로 보내본다.
  useEffect(() => {
    axios.get("/api/hello").then((response) => {
      console.log(response);
    });
  }, []);

  return <div>LandingPage</div>;
}

export default LandingPage;
