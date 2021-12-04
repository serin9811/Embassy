const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const url =
  "https://www.fr.emb-japan.go.jp/itpr_fr/restrictionsdentree2021.html";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const mailOptions = {
  from: process.env.NODEMAILER_FROM,
  to: process.env.NODEMAILER_TO,
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
