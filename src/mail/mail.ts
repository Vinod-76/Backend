var nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "578ab188f7df50",
    pass: "286f9860e65f5f",
  },
});

export const mailSent = {
  async sent(email: any): Promise<any> {
    const info = await transport.sendMail({
      from: "youremail@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Sending Email using Node.js",
      text: "That was easy!",
      html: `<b>Hey there! </b>
            <br> This is our first message sent with Nodemailer New<br/>`,
    });
  },
};
