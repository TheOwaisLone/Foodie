import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-header">
        <h1>Privacy Policy</h1>

        <p>
          Your privacy matters to us. This policy explains how Foodie collects,
          uses, and protects your information.
        </p>
      </div>

      <div className="privacy-content">
        <div className="privacy-card">
          <h2>Information We Collect</h2>

          <p>
            We may collect your name, email address, phone number, delivery
            address, and order details to provide a better experience.
          </p>
        </div>

        <div className="privacy-card">
          <h2>How We Use Your Data</h2>

          <p>
            Your information is used for order processing, customer support,
            payment handling, and improving our services.
          </p>
        </div>

        <div className="privacy-card">
          <h2>Data Security</h2>

          <p>
            We use secure technologies and trusted payment systems to protect
            your personal information from unauthorized access.
          </p>
        </div>

        <div className="privacy-card">
          <h2>Third-Party Services</h2>

          <p>
            Some services like payment gateways and analytics tools may process
            limited user data under their own privacy policies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
