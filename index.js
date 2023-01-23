const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

MONGO_URL = "mongodb+srv://emdwlekr:rladudcks91@cluster0.wuba1f8.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URL, {
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
