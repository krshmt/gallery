//@ts-nocheck

import { useState } from "react";
import "./styles.css";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Création des données au format URL Encoded
    const formDataEncoded = new URLSearchParams();
    Object.keys(formData).forEach((key) => formDataEncoded.append(key, formData[key]));

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formDataEncoded.toString(),
      });

      if (response.ok) {
        setStatus("Message envoyé avec succès !");
        setFormData({ name: "", email: "", message: "" }); // Réinitialisation du formulaire
      } else {
        setStatus("Une erreur est survenue, veuillez réessayer.");
      }
    } catch (error) {
      setStatus("Une erreur est survenue, veuillez réessayer.");
    }
  };

  return (
    <div>
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <label>
          Nom:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Message:
          <textarea name="message" value={formData.message} onChange={handleChange} required />
        </label>
        <button type="submit">Envoyer</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default Contact;