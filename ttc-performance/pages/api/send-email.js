import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      name,
      email,
      phone,
      carModel,
      discountCode,
      power,
      modifications,
      consent,
    } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "info@ttcperformance.cz",
      subject: "New Contact Form Submission",
      html: `
        <p><strong>Jméno:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Značka a typ vozidla:</strong> ${carModel}</p>
        <p><strong>Slevový kód:</strong> ${discountCode}</p>
        <p><strong>Základní výkon v kW:</strong> ${power}</p>
        <p><strong>Poptávka:</strong> ${modifications}</p>
        <p><strong>Souhlasím se zpracováním osobních údajů:</strong> ${
          consent ? "Ano" : "Ne"
        }</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
