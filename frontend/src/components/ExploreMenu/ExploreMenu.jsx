import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <section className="explore-menu" id="explore-menu">
      <div className="explore-menu-top">
        <span className="explore-badge">🍴 Food Categories</span>

        <h1>Explore Our Menu</h1>

        <p className="explore-menu-text">
          Discover handcrafted dishes made with fresh ingredients and rich
          flavors. From comfort food to gourmet meals, there’s something for
          every craving.
        </p>
      </div>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name,
              )
            }
            className={`explore-menu-list-item ${
              category === item.menu_name ? "active" : ""
            }`}
          >
            <div className="menu-image-wrapper">
              <img src={item.menu_image} alt={item.menu_name} />
            </div>

            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreMenu;
