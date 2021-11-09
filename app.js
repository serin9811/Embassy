const express = require("express");
const app = express();
const port = 3000;
var router = require("./routers/index");

app.use("/", router);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something wrong in Serin's side");
});

app.listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`);
});
