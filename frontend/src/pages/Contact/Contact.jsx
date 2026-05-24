import React from "react";
import "./Contact.css";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-left">
        <h1>Contact Us</h1>

        <p>
          Have questions, feedback, or partnership ideas? We'd love to hear from
          you.
        </p>

        <div className="contact-info">
          <div>
            <h4>
              Email <Mail size={16} />
            </h4>
            <span>ovilone92@gmail.com</span>
          </div>

          <div>
            <h4>
              Phone <Phone size={16} />
            </h4>
            <span>+91 60065 97805</span>
          </div>

          <div>
            <h4>
              Location <MapPin size={16} />
            </h4>
            <span>Srinagar, Jammu & Kashmir, India</span>
          </div>
        </div>
      </div>

      <form className="contact-form">
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Email Address" />
        <textarea rows="6" placeholder="Write your message..." />

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
