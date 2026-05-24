import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, LogOut } from "lucide-react";
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

    // navigate(`/search?q=${searchTerm}`);
  };

  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={assets.logo} alt="Foodie Logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => {
            setMenu("Home");

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
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

        {/* Cart */}
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
              className="profile-trigger"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="navbar-avatar"
              />
            </div>

            <div
              className={`nav-profile-dropdown ${
                showDropdown ? "expanded active" : ""
              }`}
            >
              <div className="dropdown-user-preview">
                <img src={user.avatar} alt={user.name} />

                <div>
                  <h4>{user.name}</h4>

                  <p>{showDropdown ? user.email : `@${user.username}`}</p>
                </div>
              </div>

              {showDropdown && (
                <>
                  <hr />

                  <li
                    onClick={() => {
                      navigate("/profile");
                      setShowDropdown(false);
                    }}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </li>

                  <li
                    onClick={() => {
                      navigate("/myorders");
                      setShowDropdown(false);
                    }}
                  >
                    <ShoppingBag size={18} />
                    <span>Orders</span>
                  </li>

                  <hr />

                  <li onClick={logout} className="logout-item">
                    <LogOut size={18} />
                    <span>Logout</span>
                  </li>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
