import React, { useContext } from "react";
import "./Profile.css";
import { StoreContext } from "../../context/StoreContext";
import {
  Mail,
  Phone,
  User,
  MapPin,
  ShoppingBag,
  Heart,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken("");

    toast.success("Logged out successfully");

    navigate("/");
  };

  return (
    <section className="profile-page">
      <div className="profile-container">
        <div className="profile-top">
          <div className="profile-avatar-section">
            <img src={user.avatar} alt={user.name} className="profile-avatar" />

            <div>
              <h1>{user.name}</h1>

              <p>@{user.username}</p>
            </div>
          </div>

          <button className="logout-btn" onClick={logout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <ShoppingBag size={24} />
            <h3>12</h3>
            <p>Total Orders</p>
          </div>

          <div className="stat-card">
            <Heart size={24} />
            <h3>24</h3>
            <p>Favorites</p>
          </div>
        </div>

        <div className="profile-details">
          <h2>Account Information</h2>

          <div className="profile-info-grid">
            <div className="profile-info-card">
              <User size={20} />

              <div>
                <span>Full Name</span>
                <h4>{user.name}</h4>
              </div>
            </div>

            <div className="profile-info-card">
              <Mail size={20} />

              <div>
                <span>Email Address</span>
                <h4>{user.email}</h4>
              </div>
            </div>

            <div className="profile-info-card">
              <Phone size={20} />

              <div>
                <span>Phone Number</span>
                <h4>{user.phone}</h4>
              </div>
            </div>

            <div className="profile-info-card">
              <MapPin size={20} />

              <div>
                <span>Location</span>
                <h4>India</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
