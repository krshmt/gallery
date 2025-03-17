//@ts-nocheck

import { useState } from "react";
import "./styles.css";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);

        fetch("/", {
            method: "POST",
            body: data,
        })
            .then(() => alert("Form submitted successfully!"))
            .catch((error) => alert(error));
    };

    return (
        <>
            <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
            >
                <input type="hidden" name="form-name" value="contact" />
                <p hidden>
                    <label>Don’t fill this out: <input name="bot-field" /></label>
                </p>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea name="message" id="message" required></textarea>
                </div>

                <button type="submit">Send</button>
            </form>

        </>
    );
}

export default Contact;
