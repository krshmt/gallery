//@ts-nocheck

import { useState } from "react";
import "./styles.css";

function Contact() {

    return (
        <>
        <h2>Contact Form</h2>
        <form method="post" name="Contact Form" netlify>
        <p>
            <label for="name">Name:</label>
            <input type="text" name="name" id="name"/>
        </p>
        <p>
            <label for="email">Email:</label>
            <input type="email" name="email" id="email"/>
        </p>
        <p>
            <label for="comments">Comments:</label><br/>
            <textarea name="comments" id="comments"></textarea>
        </p>
        <p>
            <input type="submit"/>
        </p>
        </form>            
        </>
    );
}

export default Contact;
