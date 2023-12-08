require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const mailOptions = (user) => ({
  from: process.env.EMAIL,
  // to: user.email,      <-----REMOVER COMENT
  //MOCK ------
  to: "felipeevaldt1@gmail.com",
  // ------------
  subject: "Confirme sua conta Zhay",
  html: `
    <h1> Olá, <span style="text-transform: capitalize;">${user.name}</span>! Estamos muito felizes por você escolher usar Zhay! </h1>

    <p>Para poder acessar sua conta no site é preciso confirmar seu email! Nesse link:</p>
    <a 
      href="${process.env.SITE_BASE_URL}/auth/emailConfirm/${user.token}"
      target="_blank"
    >
      Confirmar seu Email!
    </a>
    <p>Estamos ansiosos para tê-lo como nosso cliente!</p>
  `,
});

const sendComfirmEmail = async (user) => {
  try {
    // transporter.sendMail(mailOptions(user), (error, info) => {
    //   if (error) {
    //     throw Error(error.message);
    //   }
    //   return info.response;
    // });
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { sendComfirmEmail };
