import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const url = "http://192.168.31.129:4000"; // ⚠️ your IP

  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);

  // add to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // remove from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));
  };

  // fetch food list
  const fetchFoodList = async () => {
    const res = await axios.get(url + "/api/food/list");
    if (res.data.success) {
      setFoodList(res.data.data);
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  const value = {
    url,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    food_list,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreContextProvider;
