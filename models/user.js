const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 255,
  },
  email: {
    type: String,
    trim: true, // remove empty string
    unique: true,
  },

  /**
   * different types of attributes
   */
  role: {
    type: Number,
    default: 0,
  },
  image: {
    image: String,
  },
  token: {
    type: String,
  },
  /**
   * token validation period
   */
  tokenExp: {
    type: Number,
  },
});

// UserData라고 이름을 지어놓으면, 자동으로 UserHello라는 collection을 DB에 생성해서 req.body를 저장한다....
const Userwow = mongoose.model("UserIphone", userSchema);

module.exports = { Userwow };
