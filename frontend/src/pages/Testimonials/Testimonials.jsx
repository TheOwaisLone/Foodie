import React from "react";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Food Blogger",
    review:
      "Foodie completely changed how I order food. Fast delivery, clean UI, and amazing restaurant variety.",
  },
  {
    id: 2,
    name: "Sarah Khan",
    role: "Student",
    review:
      "The experience feels premium. Ordering food late at night has never been this smooth.",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    role: "Software Engineer",
    review:
      "Honestly one of the best food ordering interfaces I've used. Minimal, responsive, and fast.",
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials-page">
      <div className="testimonials-header">
        <h1>What Our Customers Say</h1>
        <p>
          Thousands of food lovers trust Foodie for quick delivery and amazing
          meals every day.
        </p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((item) => (
          <div className="testimonial-card" key={item.id}>
            <div className="quote">“</div>

            <p className="review">{item.review}</p>

            <div className="user-info">
              <h3>{item.name}</h3>
              <span>{item.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
