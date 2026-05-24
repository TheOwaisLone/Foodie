import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          src={url + "/images/" + image}
          alt={name}
          className="food-item-image"
        />

        {!cartItems[id] ? (
          <button className="add-btn" onClick={() => addToCart(id)}>
            <img src={assets.add_icon_white} alt="" />
          </button>
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />

            <p>{cartItems[id]}</p>

            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <h3>{name}</h3>

          <img src={assets.rating_starts} alt="" />
        </div>

        <p className="food-item-desc">{description}</p>

        <div className="food-item-bottom">
          <p className="food-item-price">₹{price}</p>

          <span className="food-item-tag">Bestseller</span>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
