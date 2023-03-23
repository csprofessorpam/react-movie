import React from 'react'
import axios from 'axios'
import './Slider.css'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import StarRatings from 'react-star-ratings';
import Rating from '../Rating/Rating';
import Genres from '../Genres/Genres';

import {Link} from 'react-router-dom'


function Slider() {
    //console.log("in Slider apikey is " + apiKey);
    //create state for movie data

    const apiKey=process.env.REACT_APP_API_KEY;
    const baseUrl=process.env.REACT_APP_BASE_URL;
    const imgBase=process.env.REACT_APP_IMAGE_BASE_URL;
    //console.log("imgBase", imgBase);

    const [upcomingMovies , setUpcomingMovies ] = React.useState([]);

    const [index, setIndex] = React.useState(0);

    const [currentRating, setCurrentRating] = React.useState(0);
    //need baseurl for image
    //const imgBase = "https://image.tmdb.org/t/p/w500";
    //const imgBase = "https://image.tmdb.org/t/p/original";
    

    const sliderStyle = {
        height:"60vh",
        width: "100%",
        backgroundImage: `url("${imgBase}${upcomingMovies[index]?.backdrop_path}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative" //needed for arrows to be absolute

    }

    //use axios to get data when component loads
    React.useEffect(   
        ()=>{
            //console.log('one ', index);
            axios.get(`${baseUrl}movie/upcoming?api_key=${apiKey}`)
            .then(response => {
                //console.log(response.data.results)
                //store in state
                setUpcomingMovies(response.data.results)
                //console.log((response.data.results[index]?.vote_average)/2)
                setCurrentRating((response.data.results[0]?.vote_average)/2);
                //console.log("next rating", currentRating)
            } )
            .catch(err => console.log(err))

            // if (currentRating === 0){
                
            //     setCurrentRating((upcomingMovies[index]?.vote_average)/2);
            //     console.log("new rating", currentRating)
            // }
        }, [] //[index]
    )

    //create a second useEffect just to handle updating the rating
    React.useEffect(
        ()=>{
            //console.log("two ", index);
            if (index > 0){
            //console.log("index is ", index)
            //console.log("rating before ", currentRating)
            //const nextRating = (upcomingMovies[index+1].vote_average)/2;
            //setCurrentRating(nextRating);
            setCurrentRating((upcomingMovies[index]?.vote_average)/2);
            // console.log("next rating ", currentRating)
            }
        }, [index]
    )

    const handleRight = () =>{
        //setIndex(index + 1);
        //cycle back when you get to the end
        // if(index == upcomingMovies.length - 1){
        //     setIndex(0);
        // }
        // else{
        //     setIndex(index + 1);
        // }
        index === upcomingMovies?.length - 1? 
        setIndex(0)
        :
        setIndex(index+1);
        //update rating
        //setCurrentRating(Math.round(upcomingMovies[index]?.vote_average/2));
    }

    const handleLeft = () =>{
        //setIndex(index - 1);
        index === 0? 
        setIndex(upcomingMovies?.length - 1)
        :
        setIndex(index-1);
        //update rating
        //setCurrentRating(Math.round(upcomingMovies[index]?.vote_average/2));      
    }

  return (
    <div className = "slider-container" style={sliderStyle}>
        <div className="slider-overlay"></div>
        
        <MdKeyboardArrowLeft className="left-arrow" onClick={handleLeft} />
        <MdKeyboardArrowRight className="right-arrow" onClick={handleRight} />
        <div className="movie-info">
            <h1>{upcomingMovies[index]?.title}</h1>
            <p>{upcomingMovies[index]?.overview?.slice(0, 120)}...</p>
            <p>Release Date: {upcomingMovies[index]?.release_date}</p>
            <p>Rating: {upcomingMovies[index]?.vote_average/2}</p>
            
            {/* <Rating stars={4.5}/> */}
            <Rating stars={currentRating}/>
            {/* <Rating stars={(upcomingMovies[index]?.vote_average)/2} /> */}
            
            <Genres movieGenres={upcomingMovies[index]?.genre_ids} />

            <Link to={`/moviedetails/${upcomingMovies[index]?.id}`}
                className="movie-link" >
                See Details
            </Link>
        </div>
       
    </div>
  )
}

export default Slider

{/* <StarRatings 
            // rating = {5}
             rating={Math.round(upcomingMovies[index]?.vote_average/2)}
                         starRatedColor="red"
                         starDimension="15px"
                         starSpacing="1px" /> */}

{/* <img src={`${imgBase}${upcomingMovies[0]?.backdrop_path}` } /> */}