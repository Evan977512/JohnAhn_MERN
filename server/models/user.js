const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bodyParser = require("body-parser");
// jwt 생성
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // remove empty string
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  /**
   * different types of attributes
   */
  role: {
    type: Number,
    default: 0,
  },
  image: {
    String,
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

/**
 * pre가 ~이전에 라는 뜻이니까 'save'하기 전에 실행하다는 뜻이다.
 * 아래 코드가 실행한 뒤 -> index.js에 있는 /register 코드가 실행된다.
 */
userSchema.pre("save", function (next) {
  var user = this; // this는 userSchema
  // 유저가 패스워드를 바꿀때만 실행
  if (user.isModified("password")) {
    // 비밀번호를 암호화 시킨다
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        return next(err);
      }
      /**hash는 암호화 된 비밀번호 */
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        // index.js에 있는 register 라우터로 고고싱
        next();
      });
    });
  } else {
    // password를 변경하는 작업이 아닌 경우에는 index.js에 있는 register로 바로 이동한다.
    next();
  }
});

// compare passwords
userSchema.methods.comparePassword = function (plainPassword, cb) {
  const DBPassword = this.password;
  // plainPassword == 로그인 시 입력한 String으로 된 password // cb == database에 저장되어있는 암호화 된 password
  // plainPassword도 암호화 해서 cb와 같은지 비교해야 한다. why? 이미 암호화 된건 다시 되돌리기 어렵....
  bcrypt.compare(plainPassword, DBPassword, function (err, isMatch) {
    //console.log("plainPassword: " + plainPassword);
    //console.log("DBPassword: " + DBPassword);
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// generateToken
userSchema.methods.generateToken = function (cb) {
  var user = this; // this는 userSchema
  /**
   * jsonwebtoken을 이용해서 토큰 생성하기
   * user._id + 'secretToken' = token이 된다.
   * 'secretToken' 으로 userId를 알 수 있다.
   */
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  // this.token에 생성된 토큰 적용시키기
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

// Auth를 하기위해 token찾기
// userSchema.statics.findByToken = function (token, cb) {
//   // console.log("I AM HERE2");
//   var user = this;
//   console.log("user: " + user._id);

//   // token을 decode한다
//   jwt.verify(token, "secretToken"),
//     function (err, decoded) {
//       // 유저 아이디를 이용해서 유저를 찾은 후에
//       // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인한다.
//       user.findOne({ _id: decoded, token: token }, function (err, userInfo) {
//         if (err) return cb(err);
//         cb(null, userInfo);
//       });
//     };
// };

userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  // user._id + ''  = token
  //토큰을 decode 한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

// UserData라고 이름을 지어놓으면, 자동으로 UserHello라는 collection을 DB에 생성해서 req.body를 저장한다....
const User = mongoose.model("User", userSchema);

module.exports = { User };
