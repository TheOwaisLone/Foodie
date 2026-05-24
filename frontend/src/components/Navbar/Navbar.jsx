import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, User, LogOut } from "lucide-react";
import { StoreContext } from "../../context/StoreContext";
import toast from "react-hot-toast";

const Navbar = ({ setShowLogin }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef();
  const searchTimeoutRef = useRef(null);

  const { cartItems, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();
  const location = useLocation();

  // active menu logic
  const getActiveMenu = () => {
    // homepage section priority
    if (location.pathname === "/") {
      if (activeSection === "Menu") {
        return "Menu";
      }

      if (activeSection === "App") {
        return "App";
      }

      return "Home";
    }

    switch (location.pathname) {
      case "/about":
        return "About";

      case "/contact":
        return "Contact";

      case "/testimonials":
        return "Testimonials";

      default:
        return "";
    }
  };

  const menu = getActiveMenu();

  // outside dropdown click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  // scroll spy for Menu/App
  useEffect(() => {
    const handleScroll = () => {
      const exploreMenu = document.getElementById("explore-menu");
      const appDownload = document.getElementById("app-download");

      if (!exploreMenu || !appDownload) return;

      const scrollPosition = window.scrollY + 200;

      if (
        scrollPosition >= appDownload.offsetTop &&
        scrollPosition < appDownload.offsetTop + appDownload.offsetHeight
      ) {
        setActiveSection("App");
      } else if (
        scrollPosition >= exploreMenu.offsetTop &&
        scrollPosition < exploreMenu.offsetTop + exploreMenu.offsetHeight
      ) {
        setActiveSection("Menu");
      } else {
        setActiveSection("");
      }
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);

      handleScroll();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  // logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken("");

    toast.success("Logged out successfully");

    navigate("/");
  };

  // total cart items
  const totalItems = Object.values(cartItems || {}).reduce(
    (total, item) => total + item,
    0,
  );

  // search
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setShowSearch((prev) => !prev);
      return;
    }

    console.log("Searching for:", searchTerm);

    // future route
    // navigate(`/search?q=${searchTerm}`);
  };

  // safe user parsing
  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch (error) {
    user = {};
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={assets.logo} alt="Foodie Logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>

        {/* Show only on homepage */}
        {location.pathname === "/" && (
          <>
            <a href="#explore-menu" className={menu === "Menu" ? "active" : ""}>
              Menu
            </a>

            <a href="#app-download" className={menu === "App" ? "active" : ""}>
              App
            </a>
          </>
        )}

        <Link
          to="/testimonials"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className={menu === "Testimonials" ? "active" : ""}
        >
          Testimonials
        </Link>

        <Link
          to="/about"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className={menu === "About" ? "active" : ""}
        >
          About Us
        </Link>

        <Link
          to="/contact"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className={menu === "Contact" ? "active" : ""}
        >
          Contact Us
        </Link>
      </ul>

      <div className="navbar-right">
        {/* Search */}
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
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <img
                src={user.avatar || assets.profile_icon}
                alt={user.name || "User"}
                className="navbar-avatar"
              />
            </div>

            <div
              className={`nav-profile-dropdown ${
                showDropdown ? "expanded active" : ""
              }`}
            >
              <div className="dropdown-user-preview">
                <img
                  src={user.avatar || assets.profile_icon}
                  alt={user.name || "User"}
                />

                <div>
                  <h4>{user.name || "Foodie User"}</h4>

                  <p>{user.email || "@foodie"}</p>
                </div>
              </div>

              {showDropdown && (
                <>
                  <hr />

                  <ul>
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
                  </ul>
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
