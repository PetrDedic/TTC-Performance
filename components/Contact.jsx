import { useState } from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carModel: "",
    discountCode: "",
    power: "",
    modifications: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Email sent successfully");

        if (window.dataLayer) {
          window.dataLayer.push({
            event: "form_sent",
            lead_type: "contact",
          });
        }

        setFormData({
          name: "",
          email: "",
          phone: "",
          carModel: "",
          discountCode: "",
          power: "",
          modifications: "",
          consent: false,
        });
      } else {
        alert("Error sending email");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending email");
    }
  };

  return (
    <div className={styles.contact} id="form">
      <h3 style={{ textAlign: "center" }}>Kontaktujte nás</h3>
      <p style={{ textAlign: "center" }}>
        Kontaktujte nás na telefonním čísle{" "}
        <a href="tel:+420 602 562 650">+420 602 562 650</a>, a nebo pomocí níže
        uvedeného formuláře a my se Vám ozveme.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Jméno a příjmení"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mailová adresa"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className={styles.flex}>
          <input
            type="tel"
            name="phone"
            placeholder="Telefonní číslo"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="carModel"
            placeholder="Značka a typ vozidla"
            value={formData.carModel}
            onChange={handleChange}
          />
        </div>
        <div className={styles.flex}>
          <input
            type="text"
            name="discountCode"
            placeholder="Slevový kód"
            value={formData.discountCode}
            onChange={handleChange}
          />
          <input
            type="number"
            name="power"
            placeholder="Základní výkon v kW"
            value={formData.power}
            onChange={handleChange}
          />
        </div>
        <textarea
          rows="4"
          name="modifications"
          placeholder="Poptávka úpravy na daném vozidle"
          value={formData.modifications}
          onChange={handleChange}
        />
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
          />
          <label>Souhlasím se zpracováním osobních údajů</label>
        </div>
        <input type="submit" value="Odeslat dotazník" />
      </form>
    </div>
  );
};

export default Contact;
