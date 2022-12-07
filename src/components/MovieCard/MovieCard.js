import React from 'react'
import './MovieCard.css'
import {Link} from 'react-router-dom'
import Rating from '../Rating/Rating';



//needs to be customized with width, height, imageUrl
function MovieCard({movie, imageUrl, imgHeight, cardStyle, radius}) {

   
    const apiKey=process.env.REACT_APP_API_KEY;
    const baseUrl=process.env.REACT_APP_BASE_URL;
    const imgBase=process.env.REACT_APP_IMAGE_BASE_URL;
    //console.log("movie id" , props.movie?.id);
    //console.log("pic", movie.poster_path);
    
    //show image as background
    const imageStyle = {
      // height:"300px",
      height: imgHeight,
      width: "200px",
      // backgroundImage: `url("${imgBase}${movie.poster_path}")`,
      backgroundImage: `url("${imgBase}${imageUrl}")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: radius,
      //borderRadius: "16px",
      position: "relative" //needed for arrows to be absolute

  }

  return (

    // <div className="movie-card">
      // <div className={cardStyle}>
      <Link  to={`/moviedetails/${movie.id}`} className={cardStyle}>
      <div style={imageStyle}>
          {/* MovieCard */}
          <div className="movie-info-top">
              {/* <p>{movie.vote_average}</p> */}
              <Rating stars={movie.vote_average/2} />
          </div>
          <div className="movie-info-bottom">
              <p>{movie.title}</p>
              <p>Rating: {movie.vote_average/2}</p>
          </div>
      </div>
      {
      cardStyle==="top-rated-card"?
      <p>{movie.title}</p>:
      null
      }
    {/* </div> */}
    </Link>
    
  )
}

export default MovieCard