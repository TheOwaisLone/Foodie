import React from "react";
import "./Delivery.css";

const Delivery = () => {
  return (
    <div className="delivery-page">
      <div className="delivery-header">
        <h1>Delivery Information</h1>

        <p>
          Fast, reliable, and carefully handled deliveries — because good food
          deserves good service.
        </p>
      </div>

      <div className="delivery-grid">
        <div className="delivery-card">
          <h2>Delivery Time</h2>

          <p>
            Most orders are delivered within 30–45 minutes depending on
            distance, restaurant preparation time, and traffic conditions.
          </p>
        </div>

        <div className="delivery-card">
          <h2>Coverage Areas</h2>

          <p>
            Foodie currently delivers across selected cities and nearby regions
            with expanding coverage every month.
          </p>
        </div>

        <div className="delivery-card">
          <h2>Tracking Orders</h2>

          <p>
            Customers can track their order status in real-time from preparation
            to doorstep delivery.
          </p>
        </div>

        <div className="delivery-card">
          <h2>Safe Packaging</h2>

          <p>
            Every order is packed securely to maintain freshness, hygiene, and
            food quality during transport.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
