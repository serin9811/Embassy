const axios = require("axios");
const dotenv = require("dotenv");
const { isSamePageContent, sendEmail, writeFile } = require("../utils");

dotenv.config();

async function checkPage(req, res) {
  try {
    const { data } = await axios(process.env.URL_TO_FETCH);
    try {
      const isSame = await isSamePageContent(process.env.FILE_PATH, data);
      if (isSame) {
        res.json({ content: "Page content is same" });
        return;
      }
      try {
        await writeFile(process.env.FILE_PATH, data);
        const info = await sendEmail();
        res.json({ content: info });
      } catch (err) {
        res.status(500).json({ content: "There is error to send Email" });
      }
    } catch (err) {
      // If the file doesn't exist
      if (err.code === "ENOENT") {
        try {
          await writeFile(process.env.FILE_PATH, data);
          res.json({ content: "File created" });
          return;
        } catch (err) {
          res.status(500).json({ content: "There is error", err });
          return;
        }
      }
      res.status(500).json({ content: "There is error", err });
    }
  } catch (err) {
    res.status(500).json({ content: "There is error", err });
  }
}

module.exports = { checkPage };
