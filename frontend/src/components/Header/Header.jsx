import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section className="header">
      <div className="header-overlay"></div>

      <div className="header-contents">
        <span className="header-badge">🔥 Fast Delivery in Your City</span>

        <h1>
          Delicious Food,
          <br />
          Delivered Fresh.
        </h1>

        <p>
          Discover premium dishes crafted by top chefs and delivered to your
          doorstep in minutes. Fresh ingredients, rich flavors, and comfort in
          every bite.
        </p>

        <div className="header-buttons">
          <a href="#explore-menu" className="primary-btn">
            Explore Menu
          </a>

          <Link to="/cart" className="secondary-btn">
            Order Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;
