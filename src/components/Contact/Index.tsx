//@ts-nocheck

import { useState } from "react";
import "./styles.css";

function Contact() {

  return (
    <>
      <form
        name="contact"
        method="POST"
        data-netlify="true"
      >

        <input type="hidden" name="form-name" value="contact" />

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