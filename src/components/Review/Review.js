import React from 'react'
import './Review.css'
import avatar from '../../assets/no-image.png'
//import avatar from '../../assets/avatar.jpeg'

function Review({review}) {

    const imgBase=process.env.REACT_APP_IMAGE_BASE_URL;

    //set state for image error
    const [imageError, setImageError] = React.useState(false);
    const [seeMore, setSeeMore] = React.useState(false);

  return (
    <div className="review">
        <div className="avatar-container">
            
            <img className="avatar" 
            onError = {()=>setImageError(true)} 
            src={imageError? avatar : `${imgBase}${review.author_details.avatar_path}`} />
            <p>{review.author}</p>

        </div>
        <div className="review-text">
        {
            !seeMore?
            <p >
            {review.content.slice(0, 250)}
            <span className="read-content" onClick={()=>setSeeMore(true)}>seeMore</span>
            </p>
            :
            <p >
            {review.content}
            <span className="read-content" onClick={()=>setSeeMore(false)}>seeLess</span>
            </p>
        }   
        </div>
    </div>
  )
}

export default Review