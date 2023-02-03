// Reducer에서는 state와 Action을 합쳐서 다음 State을 만들어준다.
import { LOGIN_USER } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      // ...은 spread operator는 배열,객체,문자열 등 반복 가능한 객체를 개별 요소로 분리한다
      return { ...state, loginSuccess: action.payload };
      break;

    default:
      return state;
  }
}
