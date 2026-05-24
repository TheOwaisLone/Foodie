import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Order your favourite food here. Choose from a diverse menu featuring
            a detectable array of dishes crafted with the finest ingredients and
            culinary expertise. Our mission is to satisfy your cravings and
            elevate your dining experience, one delicious meal at a time.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
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
          <h2>Get in touch</h2>
          <ul>
            <li>+91-6006597805</li>
            <li>ovilone92@gmail.com</li>
            <li>123 Srinagar, Jammu and Kashmir, India, 190001</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2026 Foodie- All Right Reserved.
      </p>
      <p className="footer-copyright">Created by Owais Lone</p>
    </div>
  );
};

export default Footer;
