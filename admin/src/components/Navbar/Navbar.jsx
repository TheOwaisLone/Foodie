import React, { useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const { token, admin, setAdmin, setToken, user } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("user");

    setToken("");
    setAdmin(false);

    toast.success("Logout Successfully");

    navigate("/");
  };

  return (
    <div className="navbar">
      {/* Left */}
      <div className="navbar-left">
        <img
          className="logo"
          src={assets.logo}
          alt="logo"
          onClick={() => navigate("/")}
        />

        <div className="admin-badge">Admin Panel</div>
      </div>

      {/* Right */}
      <div className="navbar-right">
        {token && admin ? (
          <>
            <div className="navbar-user">
              <img
                className="profile"
                src={user?.avatar || assets.profile_image}
                alt="profile"
              />

              <div className="user-details">
                <h4>{user?.name || "Admin"}</h4>
                <p>{user?.email}</p>
              </div>
            </div>

            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <button className="login-btn" onClick={() => navigate("/")}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
