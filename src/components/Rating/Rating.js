import React from 'react'
import StarRatings from 'react-star-ratings';

function Rating({stars}) {
  return (
    <div>
        <StarRatings 
             //rating = {3.5}
            rating={stars}
            starRatedColor="red"
            starEmptyColor="grey"
            numberOfStars={5}
            starDimension="15px"
            starSpacing="1px" /> 
    </div>
  )
}

export default Rating