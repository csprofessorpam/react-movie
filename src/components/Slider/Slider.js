import React from 'react'
import axios from 'axios'
import './Slider.css'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import StarRatings from 'react-star-ratings';

function Slider({baseUrl, apiKey}) {
    //console.log("in Slider apikey is " + apiKey);
    //create state for movie data
    const [upcomingMovies , setUpcomingMovies ] = React.useState([]);

    const [index, setIndex] = React.useState(0);

    const [currentRating, setCurrentRating] = React.useState(0);
    //need baseurl for image
    //const imgBase = "https://image.tmdb.org/t/p/w500";
    const imgBase = "https://image.tmdb.org/t/p/original";
    

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
            //console.log('Slider component loaded');
            axios.get(`${baseUrl}movie/upcoming?api_key=${apiKey}`)
            .then(response => {
                //console.log(response.data.results)
                //store in state
                setUpcomingMovies(response.data.results)
                setCurrentRating(Math.round((response.data.results[0].vote_average)/2));
            } )
            .catch(err => console.log(err))
        }, []
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
        index === upcomingMovies.length - 1? setIndex(0):setIndex(index+1);
        //update rating
        setCurrentRating(Math.round((upcomingMovies[index].vote_average)/2));
    }

    const handleLeft = () =>{
        //setIndex(index - 1);
        index === 0? setIndex(upcomingMovies.length - 1):setIndex(index-1);
        //update rating
        setCurrentRating(Math.round((upcomingMovies[index].vote_average)/2));
        

        
    }

  return (
    <div className = "slider-container" style={sliderStyle}>
        <div className="slider-overlay"></div>
        <MdKeyboardArrowLeft className="left-arrow" onClick={handleLeft} />
        <MdKeyboardArrowRight className="right-arrow" onClick={handleRight} />
        <div className="movie-info">
            <h1>{upcomingMovies[index]?.title}</h1>
            <p>{upcomingMovies[index]?.overview.slice(0, 120)}</p>
            <p>Release Date: {upcomingMovies[index]?.release_date}</p>
            <StarRatings rating={currentRating}
                         starRatedColor="red"
                         starDimension="15px"
                         starSpacing="1px"/>
                         <p className="see-details">See Details</p>
        </div>
        {/* <img src={`${imgBase}${upcomingMovies[0]?.backdrop_path}` } /> */}
    </div>
  )
}

export default Slider