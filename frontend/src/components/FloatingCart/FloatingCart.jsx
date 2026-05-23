import React, { useContext } from "react";
import "./FloatingCart.css";
import { StoreContext } from "../../context/StoreContext";
import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";

const FloatingCart = () => {
  const { getTotalCartAmount, cartItems } = useContext(StoreContext);

  const navigate = useNavigate();

  const location = useLocation();

  // 🔥 only show on homepage
  if (location.pathname !== "/") {
    return null;
  }

  // total items
  const totalItems = Object.values(cartItems).reduce(
    (total, item) => total + item,
    0,
  );

  // hide if empty
  if (getTotalCartAmount() === 0 || totalItems === 0) {
    return null;
  }

  return (
    <div className="floating-cart" onClick={() => navigate("/cart")}>
      <img src={assets.basket_icon} alt="" className="floating-cart-icon" />
      <div className="floating-cart-amount">₹ {getTotalCartAmount()}</div>
      <div className="floating-cart-count">{totalItems}</div>
    </div>
  );
};

export default FloatingCart;
