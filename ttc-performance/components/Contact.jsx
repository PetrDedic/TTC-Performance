import styled from "styled-components";
import { useState } from "react";

const Styled30 = styled.div`
  margin: auto;
  margin-top: 6rem;
  margin-bottom: 6rem;
  width: 75vw;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h3 {
    font-size: 1.75rem;
  }

  a {
    text-decoration: none;
    color: #101c24;
    transition: 250ms;

    &:hover {
      color: crimson;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #0b1e25;
    padding: 2rem;
    border-radius: 1rem;

    .flex {
      display: flex;
      gap: 1rem;
      @media (max-width: 1280px) {
        flex-direction: column;
      }
      & > * {
        width: 100%;
      }
    }
  }

  input,
  textarea {
    padding: 1rem;
    font-size: 1rem;
    border-radius: 1rem;
  }

  input[type="submit"] {
    background-color: crimson;
    color: white;
    border: none;
    padding: 1rem;
    cursor: pointer;
  }

  label {
    color: white;
  }

  .checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

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
    <Styled30>
      <h3>Kontaktujte nás</h3>
      <p>
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
        <div className="flex">
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
        <div className="flex">
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
          rows="8"
          name="modifications"
          placeholder="Poptávka úpravy na daném vozidle"
          value={formData.modifications}
          onChange={handleChange}
        />
        <div className="flex" style={{ flexDirection: "row-reverse" }}>
          <div className="checkbox">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
            />
            <label>Souhlasím se zpracováním osobních údajů</label>
          </div>
          <input type="submit" value="Odeslat dotazník" />
        </div>
      </form>
    </Styled30>
  );
};

export default Contact;
