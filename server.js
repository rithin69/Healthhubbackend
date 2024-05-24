const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

var myemail = process.env.SENDER_EMAIL;
var mypassword = process.env.APPLICATION_PASSWORD;

function sendEmail({ recipient_email, subject, html }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "healthhub75@gmail.com",
        pass: "mgco socz tfox yymm",
      },
    });

    const mail_configs = {
      from: "healthhub75@gmail.com",
      to: recipient_email,
      subject: subject,
      html: html,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}

app.get("/", (req, res) => {
  sendEmail()
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.post("/send-email", (req, res) => {
  console.log("Received email request", req.body);
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
