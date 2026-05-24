import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import FoodItem from "../../components/FoodItem/FoodItem";
import { assets } from "../../assets/frontend_assets/assets";

const Cart = () => {
  const {
    food_list,
    cartItems,
    getTotalCartAmount,
    url,
    discount,
    setDiscount,
    finalAmount,
    setFinalAmount,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");

  const applyPromo = async () => {
    try {
      const response = await axios.post(url + "/api/promo/apply", {
        code: promoCode,
        amount: getTotalCartAmount() + 40,
      });

      if (response.data.success) {
        setDiscount(response.data.discount);
        setFinalAmount(response.data.finalAmount);

        toast.success("Promo Applied!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error applying promo");
    }
  };

  const totalAmount =
    getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 40);

  const displayAmount = finalAmount > 0 ? finalAmount : totalAmount;

  const cartProducts = food_list.filter((item) => cartItems[item._id] > 0);

  return (
    <div className="cart">
      <div className="cart-header">
        <div>
          <h1>Your Cart</h1>

          <p>
            {cartProducts.length} item
            {cartProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </div>

      {cartProducts.length === 0 ? (
        <div className="empty-cart">
          <img src={assets.basket_icon} alt="" />

          <h2>Your cart is empty</h2>

          <p>Add something delicious first.</p>

          <button onClick={() => navigate("/")}>Explore Menu</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartProducts.map((item) => (
              <div className="cart-food-item" key={item._id}>
                <FoodItem
                  id={item._id}
                  name={item.name}
                  price={
                    item.price +
                    "x" +
                    cartItems[item._id] +
                    " = ₹" +
                    item.price * cartItems[item._id]
                  }
                  image={item.image}
                />
              </div>
            ))}
          </div>

          <div className="cart-bottom">
            <div className="cart-promocode">
              <h3>Promo Code</h3>

              <p>Have a promo code? Apply it here.</p>

              <div className="cart-promocode-input">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />

                <button onClick={applyPromo}>Apply</button>
              </div>
            </div>

            <div className="cart-total">
              <h2>Order Summary</h2>

              <div className="cart-total-details">
                <p>Subtotal</p>

                <p>₹{getTotalCartAmount()}</p>
              </div>

              <div className="cart-total-details">
                <p>Delivery Fee</p>

                <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
              </div>

              {discount > 0 && (
                <div className="cart-total-details discount">
                  <p>Discount</p>

                  <p>-₹{discount}</p>
                </div>
              )}

              <hr />

              <div className="cart-total-details total">
                <b>Total</b>

                <b>₹{displayAmount}</b>
              </div>

              <button
                className="checkout-btn"
                onClick={() => navigate("/order")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
