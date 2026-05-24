import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1800,

          style: {
            background: "rgba(30, 30, 30, 0.55)",
            color: "#fff",

            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",

            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "14px",

            padding: "12px 16px",

            fontSize: "14px",
            fontWeight: "500",

            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",

            maxWidth: "320px",
          },

          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },

          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <App />
    </StoreContextProvider>
  </BrowserRouter>,
);
