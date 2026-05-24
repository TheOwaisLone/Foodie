import React, { useContext, useEffect, useState } from "react";

import "./Orders.css";

import axios from "axios";

import { toast } from "react-toastify";

import { assets } from "../../assets/assets";

import { StoreContext } from "../../context/StoreContext";

import { useNavigate } from "react-router-dom";

const Orders = ({ url }) => {
  const navigate = useNavigate();

  const { token, admin } = useContext(StoreContext);

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetch Orders
  const fetchAllOrder = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${url}/api/order/list`, {
        headers: { token },
      });

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Status Change
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${url}/api/order/status`,
        {
          orderId,
          status: event.target.value,
        },
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);

        await fetchAllOrder();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to update status");
    }
  };

  // Auth Check
  useEffect(() => {
    if (!admin || !token) {
      toast.error("Please Login First");

      navigate("/");

      return;
    }

    fetchAllOrder();
  }, [admin, token, navigate]);

  return (
    <div className="orders-page">
      <div className="orders-container">
        {/* Header */}

        <div className="orders-header">
          <div>
            <h1>Orders Management</h1>

            <p>Track and manage all customer orders in real-time.</p>
          </div>

          <div className="orders-count">{orders.length} Orders</div>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="orders-loading">
            <p>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-orders">
            <h2>No Orders Yet</h2>

            <p>Orders will appear here when customers purchase food.</p>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((order, index) => (
              <div key={index} className="order-card">
                {/* Top */}

                <div className="order-top">
                  <div className="order-icon">
                    <img src={assets.parcel_icon} alt="parcel" />
                  </div>

                  <div className="order-id">
                    <span>Order ID</span>

                    <p>#{order._id.slice(-6)}</p>
                  </div>
                </div>

                {/* Food */}

                <div className="order-section">
                  <h4>Ordered Items</h4>

                  <p className="order-foods">
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      }

                      return item.name + " x " + item.quantity + ", ";
                    })}
                  </p>
                </div>

                {/* Customer */}

                <div className="order-section">
                  <h4>Customer</h4>

                  <p className="customer-name">
                    {order.address.firstName} {order.address.lastName}
                  </p>

                  <p className="customer-phone">{order.address.phone}</p>
                </div>

                {/* Address */}

                <div className="order-section">
                  <h4>Delivery Address</h4>

                  <p className="order-address">
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state}, {order.address.country},{" "}
                    {order.address.zipcode}
                  </p>
                </div>

                {/* Bottom */}

                <div className="order-bottom">
                  <div className="order-price">₹{order.amount}</div>

                  <select
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                  >
                    <option value="Preparing">Preparing</option>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Packing">Packing</option>
                    <option value="Assigning Delivery Partner">
                      Assigning Delivery Partner
                    </option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
