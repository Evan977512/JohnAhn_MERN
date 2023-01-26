const { User } = require("../models/user");

// 인증처리를 하는 곳
let auth = function (req, res, next) {
  // 1. 클라이언트 쿠키에서 토큰을 가져온다
  // x_auth는 index.js에서 'x_auth'라고 이름을 지었다. 알리아스같은 너낌??
  let token = req.cookies.x_auth;
  console.log("내가만든쿠키: " + token);

  // console.log("User: ");
  console.log("I AM HERE");
  // 2. 토큰을 복호화 하고 유저를 찾는다
  // console.log("USER: " + User);

  // 토큰을 복호화 한후  유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next();
    console.log("Auth userInfo: " + user);
  });

  // 3. 유저가 있으면 인증 OKAY!
  // 4. 유저가 없으면 인증 NONO
};

module.exports = { auth };
