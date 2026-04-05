import nodemailer from "nodemailer";

export const SendEmail = async (email_info) => {
  const { email, subject, html } = email_info;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.GMAIL_KEY_APPLICATION,
    },
    family: 4,
  });

  try {
    const info = await transporter.sendMail({
      from: '"LaCroix Styles" <lacroixstyles@gmail.com>',
      to: email,
      subject: subject,
      html: html,
    });
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};
