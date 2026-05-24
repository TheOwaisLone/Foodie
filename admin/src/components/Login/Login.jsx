import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const Login = ({ url }) => {
  const navigate = useNavigate();

  const { admin, setAdmin, token, setToken, setUser } =
    useContext(StoreContext);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // Input Handler
  const onChangeHandler = (event) => {
    const name = event.target.name;

    const value = event.target.value;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Login
  const onLogin = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(`${url}/api/user/login`, data);

      if (response.data.success) {
        if (response.data.user.role === "admin") {
          // Context
          setToken(response.data.token);

          setAdmin(true);

          setUser(response.data.user);

          // LocalStorage
          localStorage.setItem("token", response.data.token);

          localStorage.setItem("admin", true);

          localStorage.setItem("user", JSON.stringify(response.data.user));

          toast.success(`Welcome back ${response.data.user.name}`);

          navigate("/add");
        } else {
          toast.error("You are not an admin");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Auto Redirect
  useEffect(() => {
    if (admin && token) {
      navigate("/add");
    }
  }, [admin, token, navigate]);

  return (
    <div className="login-page">
      <div className="login-wrapper">
        {/* Left Side */}

        <div className="login-left">
          <img src={assets.logo} alt="logo" className="login-logo" />

          <h1>Foodie Admin</h1>

          <p>Manage foods, orders and customers from one modern dashboard.</p>
        </div>

        {/* Right Side */}

        <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>Welcome Back 👋</h2>

            <p>Login to continue</p>
          </div>

          <div className="login-popup-inputs">
            <div className="input-group">
              <label>Email Address</label>

              <input
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
