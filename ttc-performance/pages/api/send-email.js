import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

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

    const message = {
      to: process.env.EMAIL_TO,
      from: process.env.EMAIL_FROM,
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
      await sendgrid.send(message).then(
        () => {},
        (error) => {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      );
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error sending email", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
