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
      message,
      category,
      brand,
      otherBrand,
      model,
      otherModel,
      engine,
      otherEngine,
      discountCode,
      power,
      modifications,
      consent,
      mailTo,
      pageSource,
    } = req.body;

    // Determine if "Jiné" (Other) was selected for brand, model, or engine
    const brandName = brand === "other" ? otherBrand : brand;
    const modelName = model === "other" ? otherModel : model;
    const engineName = engine === "other" ? otherEngine : engine;

    // Check if this is a simplified form submission
    const isSimplified = !category && !brand && !model && !engine;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: mailTo || "zapletal@ttcperformance.cz",
      subject: isSimplified
        ? `Nový jednoduchý kontaktní formulář - ${
            pageSource || "Neznámá stránka"
          }`
        : `Nový kontaktní formulář - ${pageSource || "Neznámá stránka"}`,
      html: `
        <h1>${
          isSimplified
            ? "Nový jednoduchý kontaktní formulář"
            : "Nový kontaktní formulář"
        } - ${pageSource || "Neznámá stránka"}</h1>
        <p><strong>Jméno:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Stránka:</strong> ${pageSource || "Neznámá stránka"}</p>
        ${
          isSimplified
            ? `
        <p><strong>Zpráva:</strong> ${message || "N/A"}</p>
        `
            : `
        <p><strong>Kategorie vozidla:</strong> ${category || "N/A"}</p>
        <p><strong>Značka vozidla:</strong> ${brandName || "N/A"}</p>
        <p><strong>Model vozidla:</strong> ${modelName || "N/A"}</p>
        <p><strong>Motor vozidla:</strong> ${engineName || "N/A"}</p>
        <p><strong>Slevový kód:</strong> ${discountCode || "N/A"}</p>
        <p><strong>Poptávka:</strong> ${modifications || "N/A"}</p>
        <p><strong>Souhlasím se zpracováním osobních údajů:</strong> ${
          consent ? "Ano" : "Ne"
        }</p>
        `
        }
      `,
    };

    try {
      await transporter.sendMail(mailOptions).then((info) => {
        console.log("Email sent:", info);
      });
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
