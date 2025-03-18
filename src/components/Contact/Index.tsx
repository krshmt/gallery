//@ts-nocheck

import { useState } from "react";
import "./styles.css";

function Contact() {
    return (
        <>
            <h2>Contact Form</h2>
            <form
                method="post"
                name="Contact Form"
                data-netlify="true"
                action=""
            >
                <input type="hidden" name="form-name" value="Contact Form" />
                <p>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" required />
                </p>
                <p>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" required />
                </p>
                <p>
                    <label htmlFor="comments">Comments:</label><br />
                    <textarea name="comments" id="comments" required></textarea>
                </p>
                <p>
                    <input type="submit" value="Submit" />
                </p>
            </form>
        </>
    );
}

export default Contact;