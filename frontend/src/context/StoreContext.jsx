import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");

  // promo states
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const url = "http://localhost:4000";

  // 🔥 restore login
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // 🔥 add to cart
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: 1,
      }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }

    if (token) {
      try {
        const response = await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } },
        );

        if (response.data.success) {
          toast.success("Added to cart", {
            id: "cart-toast",
          });
        } else {
          toast.error("Something went wrong", {
            id: "error-toast",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 🔥 remove from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));

    if (token) {
      try {
        const response = await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } },
        );

        if (response.data.success) {
          toast.success("Item Removed from Cart", {
            id: "cart-toast",
          });
        } else {
          toast.error("Something went wrong", {
            id: "error-toast",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 🔥 total amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }

    return totalAmount;
  };

  // 🔥 fetch foods
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");

      if (response.data.success) {
        setFoodList(response.data.data);
      } else {
        toast.error("Products not loading", {
          id: "error-toast",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 load cart data
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } },
      );

      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 initial load
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      const savedToken = localStorage.getItem("token");

      if (savedToken) {
        setToken(savedToken);

        await loadCartData(savedToken);
      }
    }

    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,

    // promo
    discount,
    setDiscount,
    finalAmount,
    setFinalAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
