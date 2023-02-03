import axios from "axios";
import { LOGIN_USER } from "./types";

export function loginUser(dataToSubmit) {
  // 서버에서 받은 response를 'request'에 저장한다.
  const request = axios.post("/api/users/login", dataToSubmit).then((response) => response.data);

  // 그다음 return을 해서 Reducer에 보내야 한다.
  return {
    type: "LOGIN_USER",
    payload: request,
  };
}
