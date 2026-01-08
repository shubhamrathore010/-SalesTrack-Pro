import nodemailer from "nodemailer"

let transporter = null;

const getTransporter = async () => {
    if (transporter) return transporter;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error("Email credentials are missing")
    }

 transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

await transporter.verify();
console.log("Email server ready");

return transporter
};

export const sendEmail = async (to, subject, text) => {
  const mailer = await getTransporter();

  return mailer.sendMail({
    from: `"CRM System" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};
