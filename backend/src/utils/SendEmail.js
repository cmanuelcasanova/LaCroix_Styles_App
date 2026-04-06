//import nodemailer from "nodemailer";
import sgMail  from '@sendgrid/mail';

export const SendEmail = async (email_info) => {
  /*
  try {
  const { email, subject, html } = email_info;

  const transporter = nodemailer.createTransport({
    port: 587,
    host: "smtp.gmail.com",
    secure: false,
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


*/


  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

 
  const { email, subject, html } = email_info;
  const msg = {
    to: email,
    from: process.env.EMAIL, 
    subject: subject,
    html: html,
  };

  try {
    await sgMail.send(msg);
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }





};
