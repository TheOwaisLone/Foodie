import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import toast from "react-hot-toast";

const Verify = () => {
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url, setCartItems, token } = useContext(StoreContext);

  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/verify",
        {
          success,
          orderId,
        },
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        // 🔥 force clear frontend state
        setCartItems({});

        toast.success("Order Placed Successfully");

        // 🔥 hard refresh state
        window.location.href = "/myorders";
      } else {
        toast.error("Something went wrong");
        navigate("/");
      }
    } catch (error) {
      console.log(error);

      toast.error("Verification Failed");

      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
