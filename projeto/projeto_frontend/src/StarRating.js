import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
    return (
        <div style={{ display: "flex", gap: "4px" }}>
            {[...Array(5)].map((_, index) => (
                <FaStar
                    key={index}
                    color={index < Math.round(rating) ? "#e51b15" : "#ccc"}
                />
            ))}
        </div>
    );
};

export default StarRating;
