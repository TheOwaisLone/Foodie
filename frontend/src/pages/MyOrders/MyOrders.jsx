import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";
import { io } from "socket.io-client";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);

  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      {
        headers: { token },
      },
    );

    if (response.data.success) {
      setData(response.data.data);
    }
  };

  // FETCH ORDERS
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // SOCKET LOGIC
  useEffect(() => {
    if (!data.length) return;

    const socket = io("http://localhost:4000");

    data.forEach((order) => {
      socket.emit("joinOrderRoom", order._id);
    });

    socket.on("orderStatusUpdated", ({ orderId, status }) => {
      setData((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order,
        ),
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [data]);

  return (
    <div className="my-orders">
      <div className="my-orders-header">
        <h1>My Orders</h1>

        <p>Track your live order status in real-time</p>
      </div>

      <div className="orders-grid">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <div className="order-top">
                <img src={assets.parcel_icon} alt="" />

                <div>
                  <h3>Order #{order._id.slice(-6)}</h3>

                  <p>
                    {order.items.length} item
                    {order.items.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <span key={index}>
                    {item.name} × {item.quantity}
                  </span>
                ))}
              </div>

              <div className="order-bottom">
                <div>
                  <p>Total</p>

                  <h2>₹{order.amount}</h2>
                </div>

                <div
                  className={`order-status ${order.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <span></span>

                  <b>{order.status}</b>
                </div>
              </div>

              <button onClick={fetchOrders}>Refresh Status</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
