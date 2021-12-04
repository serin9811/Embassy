const https = require("https");
const fs = require("fs");
const emailController = require("./email.controller");
const { off } = require("process");

const url =
  "https://www.fr.emb-japan.go.jp/itpr_fr/restrictionsdentree2021.html";

exports.checkPage = function (req, res) {
  var request = https.get(url, function (response) {
    var content = "";
    if (response.statusCode === 200) {
      response.on("data", function (chunk) {
        content += chunk;
      });
      response.on("end", function () {
        if (fs.existsSync("./previous.html")) {
          fs.readFile("previous.html", "utf-8", (err, data) => {
            if (data == content) {
              res.json({ message: "content hasn't changed" });
            } else {
              fs.writeFile("./previous.html", content, function (err) {
                if (err) {
                  res.json({ message: err });

                  return;
                }
                emailController.sendEmail();
                res.json({ message: "content has changed" });
              });
            }
          });
        } else {
          fs.writeFile("./previous.html", content, function (err) {
            if (err) {
              res.json({ message: err });

              return;
            }
            res.json({ message: "content has changed initial" });
          });
        }
      });
    }

    // Add timeout.
    request.setTimeout(12000, function () {
      request.destroy();
    });
  });
};
