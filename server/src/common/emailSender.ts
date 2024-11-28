import nodemailer from 'nodemailer';

export const setndEmail = async (
  sendTo: string,
  subject: string,
  content: string
) => {
  let emailUser = process.env.EMAIL_USER;
  let emailPass = process.env.EMAIL_PASS;
  let emailHost = process.env.EMAIL_HOST;
  if (process.env.NODE_ENV === 'development') {
    const testAccount = await nodemailer.createTestAccount();
    emailUser = testAccount.user;
    emailPass = testAccount.pass;
    emailHost = emailHost || 'smtp.ethereal.email';
  } else {
    if (!emailUser || !emailPass || !emailHost) {
      throw new Error('Error sending email. Invalid email configuration.');
    }
  }

  const transporter = nodemailer.createTransport({
    host: emailHost,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false, // TODO: use TLS in production
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const info = await transporter.sendMail({
    from: `"News Portal" <${process.env.EMAIL_USER}>`,
    to: sendTo,
    subject: subject,
    html: content,
  });

  if (process.env.NODE_ENV === 'development')
    console.log(
      'Preview email on this url: %s',
      nodemailer.getTestMessageUrl(info)
    );
};
