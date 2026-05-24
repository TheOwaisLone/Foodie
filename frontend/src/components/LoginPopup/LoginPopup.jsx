import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${url}/api/user/login`, data);

      if (response.data.success) {
        setToken(response.data.token);

        localStorage.setItem("token", response.data.token);

        localStorage.setItem("user", JSON.stringify(response.data.user));

        toast.success("Login successful");

        setShowLogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-popup" onClick={() => setShowLogin(false)}>
      <form
        onSubmit={onLogin}
        className="login-popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="login-popup-title">
          <div>
            <h2>Welcome Back</h2>

            <p className="login-subtitle">
              Login to continue ordering your favorite meals.
            </p>
          </div>

          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>

        <div className="login-popup-inputs">
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Enter your email"
            required
          />

          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">Login</button>

        <p className="register-redirect">
          Don’t have an account?
          <span
            onClick={() => {
              setShowLogin(false);
              navigate("/register");
            }}
          >
            Create one
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
