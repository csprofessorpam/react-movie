import axios from 'axios';
import React from 'react'
import {useParams} from 'react-router-dom'
import './MovieDetails.css'


import ReactPlayer from 'react-player'
import Review from '../../components/Review/Review';

import { ThemeContext } from '../../contexts/ThemeContext'
import Rating from '../../components/Rating/Rating';

//need to grab param



function MovieDetails() {
  const apiKey=process.env.REACT_APP_API_KEY;
  const baseUrl=process.env.REACT_APP_BASE_URL;
  const imgBase=process.env.REACT_APP_IMAGE_BASE_URL;

  //note CURLY brackets here!
  const {darkMode, setDarkMode} = React.useContext(ThemeContext)

  //need to get the param
  //const params = useParams();
  //console.log("param is " , params.movieId);
  const {movieId} = useParams();
  console.log(movieId);
  //now can use movieId instead of params.movieId
  //now you need to request data from api
  //store in state
  const [movie, setMovie] = React.useState({});
  const [rating, setRating] = React.useState(0);

  const [videoLink, setVideoLink] = React.useState('')

  const [reviews, setReviews] = React.useState([])

  const [reviewNumber, setReviewNumber] = React.useState(3);
  const [totalReviews, setTotalReviews] = React.useState(0);

  //endpoint for videos
  //https://api.themoviedb.org/3/movie/653851/videos?api_key=c315ba96d8b132c0836df2e55986edc6


  React.useEffect(
    ()=>{

      //console.log(`${baseUrl}movie/${params.movieId}?api_key=${apiKey}`)
      axios.get(`${baseUrl}movie/${movieId}?api_key=${apiKey}`)
      .then(res=>{
        //console.log(res.data)
        setMovie(res.data)
        setRating(res.data.vote_average / 2)
      })
      .catch(err=>console.log(err))

      //need to get video info
      axios.get(`${baseUrl}movie/${movieId}/videos?api_key=${apiKey}`)
      .then(res=>{
        //console.log(res.data.results)
        //filter to find the ones with "YouTube" and "Trailer"
        //console.log(res.data.results.filter(item => item.site==="YouTube" && item.type==="Trailer"))

        const youTubeLinks = res.data.results.filter(item => item.site==="YouTube" && item.type==="Trailer")

        //pick the first one
        setVideoLink(youTubeLinks[0].key);
        //key is what is needed to find the video on youtube

        //https://www.youtube.com/watch?v=nIvBBd8pU1s

      })
      .catch(err=>console.log(err))

      //get reviews
      axios.get(`${baseUrl}movie/${movieId}/reviews?api_key=${apiKey}`)
      .then(res=>{
        console.log(res.data)
        setReviews(res.data.results);
        setTotalReviews(res.data.total_results);
      })
      .catch(err=>console.log(err))

    }, []
  )

  //<div className={darkMode ? "header-container" : "header-container header-light"}>

  return (
    <div className={darkMode ? "details-container" : "details-container details-light"}>

      {
        videoLink ?
        <div className="trailer-container">
          <ReactPlayer 
            className="trailer-player"
            url={`https://www.youtube.com/watch?v=${videoLink}`}
            width="100%"
            height="100%"  
          />
        </div>
      :
      <div className="trailer-container-blank"
           style={
            {
              backgroundImage:`url("${imgBase}/${movie?.backdrop_path}")`,
              backgroundPosition:"center",
              backgroundSize:"cover"
             }}  >
          <p>No trailers released yet</p>
      </div>

      }
      
      <h2>{movie?.original_title}</h2>
      <Rating stars={rating} />

      <div className="info-container">
        <img src={`${imgBase}/${movie?.poster_path}`} 
             className="details-poster" />
        <div className="movie-details-info">
            <h2>{movie?.tagline}</h2>
            <h4>{movie?.overview}</h4>
            <h4>Status: <span>{movie?.status}</span></h4>
            <h4>Runtime: <span>{movie?.runtime}</span></h4>
            <h4>Budget: <span>{movie?.budget}</span></h4>
        </div>
      
      </div>
      <div className="review-container">
        {
          reviews.slice(0, reviewNumber).map(item=><Review review={item} />)
        }
        {/* {
          reviews.map(item => <p>{item.content}</p>)
        } */}
      </div>
      {
        reviewNumber <= totalReviews?
        
        <p onClick={()=>setReviewNumber(reviewNumber + 3)}>Read more reviews</p>
        :
        <p onClick={()=>setReviewNumber(3)}>End of reviews</p>
      }

    </div>
  )
}

export default MovieDetails