import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/frontend_assets/assets";

const AppDownload = () => {
  return (
    <section className="app-download" id="app-download">
      <div className="app-download-content">
        <span className="download-badge">📱 Mobile Experience</span>

        <h2>
          Get the Foodie App
          <br />
          for Faster Ordering
        </h2>

        <p>
          Enjoy lightning-fast ordering, real-time delivery tracking, exclusive
          offers, and a smoother food experience directly from your phone.
        </p>

        <div className="app-download-platforms">
          <div className="coming-soon-wrapper">
            <img src={assets.play_store} alt="Google Play" />
            <span className="coming-soon-badge">Coming Soon</span>
          </div>
          <div className="coming-soon-wrapper">
            <img src={assets.app_store} alt="App Store" />

            <span className="coming-soon-badge">Coming Soon</span>
          </div>
        </div>
      </div>

      <div className="app-download-glow"></div>
    </section>
  );
};

export default AppDownload;
