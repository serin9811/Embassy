const express = require("express");
const morgan = require("morgan");
const cron = require("node-cron");

const router = require("./routers");
const { fecthTheUrl } = require("./script");

const app = express();
const port = 3000;

app.use(morgan("common"));
app.use("/", router);

cron.schedule("* * */6 * * *", async () => {
  console.log("running a task every hour");

  await fecthTheUrl();
});

app.listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`);
});
