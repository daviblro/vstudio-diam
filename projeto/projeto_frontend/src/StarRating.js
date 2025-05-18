import React from "react";
import { FaStar } from "react-icons/fa"

const StarRating = ({ rating }) => {
    let i = 0;
    return(
        <>
        
        {[...Array(5)].map(star => {
            if (Math.floor(rating) < 5 && i < 4) {
                i += 1
            return (
                <FaStar color="#e51b15"/>
                
            )} else {
                i += 1
                return (
                    <FaStar color="e51b15"/>

                )
            }

        })}
            
        </>
    )
}

export default StarRating;
