const express = require("express");

const config = require("./config/key");

require("dotenv").config();
const { PORT } = process.env;

const app = express();
const port = PORT || 4000; // 서버 포트 번호. .env에 PORT 값이 설정되어 있지 않다면 4000 사용
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

/**
 * body-parser는 node.js 모듈입니다.
 * 클라이언트 POST request data의 body로부터 파라미터를 편리하게 추출합니다.
 */
const bodyParser = require("body-parser");

// application/x-www-form-urlencoded이렇게 된 데이터를 분석할수 있게 해주는 코드이다....? 어렵쓰....
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입으로 되어있는것을 분석해서 가져올수 있게 해준다.
app.use(bodyParser.json());

// 회원가입 유저의 client데이터를 가져오려면 userSchema를 import해야한다
const { Userwow } = require("./models/User");

mongoose
  .connect(config.MONGO_URI, {
    /**
     * 이렇게 해야 에러가 발생하지 않는다.....?
     */
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB....");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// register routes
app.post("/register", (req, res) => {
  /**
   * 회원 가입할때 피요한 정보들을 client에서 가져오면
   * 그것들을 database에 넣어준다.
   * -> 저번에 만든 userSchema를 가져와야 한다
   * -> const { User } = require("./models/User");
   */
  /**
   * req.body안에는 {id: "Evan"}, {password: "1q2w3e4r!"} ...etc
   * 같은 정보가 들어있다.
   * body-parser가 있기 때문에 가능한 일
   */
  const user = new Userwow(req.body);

  /**
   * save를 하기 전에 비밀번호를 암호화 해야한다.
   */

  // 위에서 받은 data를 database에 저장해보자
  user.save(function (err, userInfo) {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true }), console.log(userInfo);
  });
});

// login route만들기
app.post("/login", (req, res) => {
  // 1. 요청된 name이나 email을 database에서 찾아야한다
  Userwow.findOne({ email: req.body.email }, function (err, userInfo) {
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        message: "Invalid email or username",
      });
    }
    // 2. 요청한 name이나 email이 있다면 password가 같은지 확인한다.
    userInfo.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({ loginSuccess: false, message: "Invalid password" });
      // 3. password까지 맞다면 토큰을 생성하기.
      userInfo.generateToken((err, userInfo));
    });
  });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!!! sweeeeet`);
});
