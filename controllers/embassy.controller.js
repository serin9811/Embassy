const https = require("https");
const fs = require("fs");
const { resolve } = require("path");

const url =
  "https://www.fr.emb-japan.go.jp/itpr_fr/restrictionsdentree2021.html";

exports.checkPage = function (req, res) {
  res.send("will check page here!");

  var request = https.get(url, function (response) {
    var content = "";
    if (response.statusCode === 200) {
      response.on("data", function (chunk) {
        content += chunk;
      });
      response.on("end", function () {
        if (fs.existsSync("previous.html")) {
          fs.readFile("previous.html", "utf-8", (err, data) => {
            if (data == content) {
              console.log("same file");
            } else {
              console.log("diff");
            }
          });
        } else {
          var file = fs.createWriteStream("previous.html");
          response.pipe(file);
        }
      });
    }
    // Add timeout.
    request.setTimeout(12000, function () {
      request.destroy();
    });
  });
};
