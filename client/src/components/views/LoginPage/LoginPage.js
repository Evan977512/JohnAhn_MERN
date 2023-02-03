import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux"; // dispatch를 해서 action에 보낸다...?
import { loginUser } from "../../../_actions/user_action";

function LoginPage() {
  // dispatch를 해보자..... 어려울지도??
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.target.value);
    // console.log(e.target.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
    // console.log(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    //state에 무슨 정보가 저장되어있는지 확인해보자
    console.log("Email: ", Email, "password: ", Password);

    // state정보가 잘 저장 되어있다면 DB에 자료를 전송해보자
    let body = {
      email: Email,
      password: Password,
    };

    // loginUser라는 Action을 만들어서 보낸다
    dispatch(loginUser(body));

    /**
     * serve에 똑같은 주소로 post요청을 보낸다.
     * redux를 사용하지 않으면 이렇게 간단하게 보낼 수 있지만......
     */
    // axios.post("/api/users/login", body).then((response) => {});
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh" }}>
      <form action="POST" style={{ display: "flex", flexDirection: "column" }} onSubmit={onSubmitHandler}>
        <label htmlFor="">Email</label>
        <input type="text" value={Email} onChange={onEmailHandler} />
        <br />
        <label htmlFor="">Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
