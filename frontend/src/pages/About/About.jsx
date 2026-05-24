import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-content">
          <span className="about-tag">About Foodie</span>

          <h1>
            Bringing Delicious Food
            <br />
            To Your Doorstep
          </h1>

          <p>
            Foodie is built to make food ordering simple, fast, and enjoyable.
            From local favorites to premium restaurants, we connect hungry
            people with amazing meals in just a few clicks.
          </p>
        </div>

        <div className="about-card">
          <div className="stat-box">
            <h2>50K+</h2>
            <span>Happy Customers</span>
          </div>

          <div className="stat-box">
            <h2>120+</h2>
            <span>Restaurants</span>
          </div>

          <div className="stat-box">
            <h2>99%</h2>
            <span>Delivery Success</span>
          </div>
        </div>
      </div>

      <div className="about-section">
        <div className="about-info-card">
          <h2>Our Mission</h2>

          <p>
            We believe food delivery should feel effortless. Our mission is to
            create a modern experience where quality meals, fast service, and a
            beautiful interface work together seamlessly.
          </p>
        </div>

        <div className="about-info-card">
          <h2>Why Choose Foodie?</h2>

          <ul>
            <li>⚡ Fast and reliable delivery</li>
            <li>🍔 Wide range of restaurants</li>
            <li>📱 Clean and modern interface</li>
            <li>💳 Secure ordering experience</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
