import { combineReducers } from "redux";

import user from "./user_reducer";

const rootReaducer = combineReducers({
  user,
});

export default rootReaducer;
