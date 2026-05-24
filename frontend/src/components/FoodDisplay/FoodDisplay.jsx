import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  const filteredFoods =
    category === "All"
      ? food_list
      : food_list.filter((item) => item.category === category);

  return (
    <section className="food-display" id="food-display">
      <div className="food-display-top">
        <div>
          <span className="food-badge">✨ Popular Picks</span>

          <h2>
            {category === "All"
              ? "Top Dishes Near You"
              : `${category} Specials`}
          </h2>

          <p>
            Freshly prepared meals crafted with premium ingredients and
            delivered hot to your doorstep.
          </p>
        </div>

        <div className="food-count">{filteredFoods.length} Items</div>
      </div>

      <div className="food-display-list">
        {filteredFoods.map((item) => (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
};

export default FoodDisplay;
