import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // Token
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Admin
  const [admin, setAdmin] = useState(localStorage.getItem("admin") === "true");

  // User
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  );

  // Sync LocalStorage on Refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    const storedAdmin = localStorage.getItem("admin") === "true";

    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedAdmin) {
      setAdmin(storedAdmin);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Context Values
  const contextValue = {
    token,
    setToken,

    admin,
    setAdmin,

    user,
    setUser,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
