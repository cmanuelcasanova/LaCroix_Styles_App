import nodemailer from "nodemailer";

export const SendEmail = async (email_info) => {
  
  try {
  const { email, subject, html } = email_info;

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.GMAIL_KEY_APPLICATION.replace(/\s+/g, ""),
    },
  });

  const mailData = {
      from: '"LaCroix Styles" <lacroixstyles@gmail.com>',
      to: email,
      subject: subject,
      html: html,
  }

  await new Promise ((resolve,reject) => {
      
      transporter.sendMail(mailData,(err,info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });

})
}catch (error) {
  res.status(500).json({ message: error.message });
}
};
