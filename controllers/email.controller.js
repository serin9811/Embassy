var nodemailer = require("nodemailer");
const url =
  "https://www.fr.emb-japan.go.jp/itpr_fr/restrictionsdentree2021.html";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "serinaheo@gmail.com",
    pass: "Serin123!",
  },
});

var mailOptions = {
  from: "serinaheo@gmail.com",
  to: "florian.ludot@gmail.com",
  //to: "serinaheo@gmail.com",
  subject: "Check French Embassy Website",
  text: "Check " + url + ". New information has been updated..!",
};
exports.sendEmail = function () {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
