import React from 'react'
import './Review.css'

function Review({review}) {

    const imgBase=process.env.REACT_APP_IMAGE_BASE_URL;

  return (
    <div className="review">
        <div className="avatar-container">
            <img className="avatar" src={`${imgBase}${review.author_details.avatar_path}`} />

        </div>
        {/* {review.content} */}
    </div>
  )
}

export default Review