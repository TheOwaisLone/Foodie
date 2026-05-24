import React, { useContext, useEffect, useState } from "react";

import "./List.css";

import axios from "axios";

import { toast } from "react-toastify";

import { StoreContext } from "../../context/StoreContext";

import { useNavigate } from "react-router-dom";

const List = ({ url }) => {
  const navigate = useNavigate();

  const { token, admin } = useContext(StoreContext);

  const [loading, setLoading] = useState(true);

  const [list, setList] = useState([]);

  // Fetch Food List
  const fetchList = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food list");
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Remove Food
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(
        `${url}/api/food/remove`,
        { id: foodId },
        {
          headers: {
            token,
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);

        await fetchList();
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  // Admin Check
  useEffect(() => {
    if (!admin || !token) {
      toast.error("Please Login First");

      navigate("/");

      return;
    }

    fetchList();
  }, [admin, token, navigate]);

  return (
    <div className="list-page">
      <div className="list-container">
        {/* Header */}

        <div className="list-header">
          <div>
            <h1>Food Items</h1>

            <p>Manage all food products from your dashboard.</p>
          </div>

          <div className="food-count">{list.length} Items</div>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="list-loading">
            <p>Loading foods...</p>
          </div>
        ) : list.length === 0 ? (
          <div className="empty-state">
            <h2>No Food Items Found</h2>

            <p>Start adding delicious food items to your menu.</p>
          </div>
        ) : (
          <div className="food-grid">
            {list.map((item) => {
              return (
                <div key={item._id} className="food-card">
                  {/* Image */}

                  <div className="food-image-wrapper">
                    <img
                      src={`${url}/images/${item.image}`}
                      alt={item.name}
                      className="food-image"
                    />

                    <span className="food-category">{item.category}</span>
                  </div>

                  {/* Content */}

                  <div className="food-content">
                    <div className="food-top">
                      <h3>{item.name}</h3>

                      <p className="food-price">₹{item.price}</p>
                    </div>

                    <p className="food-description">
                      {item.description?.slice(0, 80)}
                      ...
                    </p>
                  </div>

                  {/* Actions */}

                  <div className="food-actions">
                    <button
                      className="delete-btn"
                      onClick={() => removeFood(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
