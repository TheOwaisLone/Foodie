import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef();

  const { cartItems, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logged out successfully");
    navigate("/");
  };

  // total items
  const totalItems = Object.values(cartItems).reduce(
    (total, item) => total + item,
    0,
  );

  // search state
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const searchTimeoutRef = useRef(null);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setShowSearch((prev) => !prev);
      return;
    }

    console.log("Searching for:", searchTerm);

    // Example:
    // navigate(`/search?q=${searchTerm}`);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={assets.logo} alt="Foodie Logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>

        <a
          href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>

        <a
          href="#app-download"
          onClick={() => setMenu("Mobile")}
          className={menu === "Mobile" ? "active" : ""}
        >
          App
        </a>

        <a
          href="/"
          onClick={() => setMenu("Testimonials")}
          className={menu === "Testimonials" ? "active" : ""}
        >
          Testimonials
        </a>

        <a
          href="/about"
          onClick={() => setMenu("About")}
          className={menu === "About" ? "active" : ""}
        >
          About Us
        </a>

        <a
          href="/contact"
          onClick={() => setMenu("Contact")}
          className={menu === "Contact" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right">
        {/* Search bar */}
        <div
          className={`search-container ${showSearch ? "active" : ""}`}
          onMouseEnter={() => {
            clearTimeout(searchTimeoutRef.current);
          }}
          onMouseLeave={() => {
            if (!searchTerm.trim()) {
              searchTimeoutRef.current = setTimeout(() => {
                setShowSearch(false);
              }, 500);
            }
          }}
        >
          <input
            type="text"
            placeholder="Search food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={() => {
              if (!searchTerm.trim()) {
                searchTimeoutRef.current = setTimeout(() => {
                  setShowSearch(false);
                }, 500);
              }
            }}
            className="search-input"
          />

          <div className="icon-wrapper" onClick={handleSearch}>
            <img src={assets.search_icon} alt="Search" />
          </div>
        </div>
        {/* Searchbar End */}
        {/* Cart icon with badge */}

        <Link to="/cart" className="cart-container">
          <img src={assets.basket_icon} alt="Cart" />

          {totalItems > 0 && <div className="cart-badge">{totalItems}</div>}
        </Link>
        {!token ? (
          <button className="signin-btn" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        ) : (
          <div className="navbar-profile" ref={dropdownRef}>
            <div
              className="profile-wrapper"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="profile-icon"
              />
            </div>

            <ul
              className={`nav-profile-dropdown ${showDropdown ? "active" : ""}`}
            >
              <li
                onClick={() => {
                  navigate("/myorders");
                  setShowDropdown(false);
                }}
              >
                <img src={assets.bag_icon} alt="" /> Orders
              </li>

              <hr />

              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
