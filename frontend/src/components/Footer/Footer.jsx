import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-glow"></div>

      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Foodie Logo" className="footer-logo" />

          <p>
            Foodie brings your favorite meals directly to your doorstep with
            fast delivery, premium quality, and an effortless ordering
            experience designed for food lovers.
          </p>

          <div className="footer-social-icons">
            <a href="/">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>

            <a href="/">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>

            <a href="/">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>

        <div className="footer-content-center">
          <h2>Quick Links</h2>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/about">About Us</Link>
            </li>

            <li>
              <Link to="/delivery">Delivery</Link>
            </li>

            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>Contact</h2>

          <ul>
            <li>
              <Phone size={18} />
              <span>+91 60065 97805</span>
            </li>

            <li>
              <Mail size={18} />
              <span>ovilone92@gmail.com</span>
            </li>

            <li>
              <MapPin size={18} />
              <span>Srinagar, Jammu & Kashmir, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Foodie. All rights reserved.</p>

        <p>
          Made with ❤️ by <span>Owais Lone</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
