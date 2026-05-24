import React, { useContext, useState } from "react";
import "./Register.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff, User, Mail, Lock, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const avatarList = [
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Max",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Jasper",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Luna",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Leo",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Zara",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=Nova",
];

const Register = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const avatar = avatarList[Math.floor(Math.random() * avatarList.length)];

      const response = await axios.post(`${url}/api/user/register`, {
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
        avatar,
      });

      if (response.data.success) {
        setToken(response.data.token);

        localStorage.setItem("token", response.data.token);

        localStorage.setItem("user", JSON.stringify(response.data.user));

        toast.success("Account created successfully");

        navigate("/profile");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-page">
      <div className="register-left">
        <span className="register-badge">🚀 Join Foodie Today</span>

        <h1>
          Create Your
          <br />
          Foodie Account
        </h1>

        <p>
          Discover amazing meals, fast delivery, live order tracking, and a
          premium food ordering experience.
        </p>

        <div className="register-features">
          <div>🍔 Fast Food Delivery</div>
          <div>⚡ Real-time Order Tracking</div>
          <div>🎁 Exclusive Offers & Rewards</div>
        </div>
      </div>

      <div className="register-right">
        <form onSubmit={onSubmitHandler} className="register-form">
          <div className="register-form-top">
            <h2>Create Account</h2>

            <p>Start your delicious journey with Foodie.</p>
          </div>

          <div className="input-group">
            <User size={18} />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="input-group">
            <User size={18} />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="input-group">
            <Mail size={18} />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={data.email}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="input-group">
            <Phone size={18} />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={data.phone}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="input-group">
            <Lock size={18} />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={onChangeHandler}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="input-group">
            <Lock size={18} />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={data.confirmPassword}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="terms-box">
            <input type="checkbox" required />

            <p>I agree to the Terms of Service and Privacy Policy.</p>
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="login-link">
            Already have an account?
            <span onClick={() => setShowLogin(true)}> Sign In</span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
