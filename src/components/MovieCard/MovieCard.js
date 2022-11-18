import React from 'react'
import './MovieCard.css'
import {Link} from 'react-router-dom'

//needs to be customized with width, height, imageUrl
function MovieCard(props) {
    //console.log("movie id" , props.movie?.id);
    const imgBase = "https://image.tmdb.org/t/p/original";
  return (

    <Link to={`/moviedetails/${props.movie?.id}`}>
    <div className="movie-card">
        {/* <p>{props.movie.original_title}</p> */}
        <img src={`${imgBase}${props.imageUrl}`} className={props.layout}/>

    
    </div>
    </Link>
  )
}

export default MovieCard