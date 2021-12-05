const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const dotenvExpand = require("dotenv-expand");

dotenvExpand(dotenv.config());

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
  subject: process.env.EMAIL_SUBJECT,
  text: process.env.EMAIL_TEXT,
};

async function sendEmail() {
  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (err) {
    throw err;
  }
}

module.exports = sendEmail;
