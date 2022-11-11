import React from 'react'
import axios from 'axios'
import './Slider.css'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";


function Slider({baseUrl, apiKey}) {
    //create state for movie data
    const [upcomingMovies , setUpcomingMovies ] = React.useState([]);

    const [index, setIndex] = React.useState(0);
    const imgBase = "https://image.tmdb.org/t/p/w500";
    //need baseurl for image

    const sliderStyle = {
        height:"60vh",
        width: "100%",
        backgroundImage: `url("${imgBase}${upcomingMovies[index]?.backdrop_path}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"

    }

    //use axios to get data when component loads
    React.useEffect(
        ()=>{
            console.log('Slider component loaded');
            axios.get(`${baseUrl}movie/upcoming?api_key=${apiKey}`)
            .then(response => {
                console.log(response.data.results)
                setUpcomingMovies(response.data.results)
            } )
            .catch(err => console.log(err))
        }, []
    )

    const handleRight = () =>{
        setIndex(index + 1);
    }

    const handleLeft = () =>{
        setIndex(index - 1);
    }

  return (
    <div className = "slider-container" style={sliderStyle}>
        <div className="slider-overlay"></div>
        <MdKeyboardArrowLeft className="left-arrow" onClick={handleLeft} />
        <MdKeyboardArrowRight className="right-arrow" onClick={handleRight} />
        <h3>{upcomingMovies[0]?.original_title}</h3>
        {/* <img src={`${imgBase}${upcomingMovies[0]?.backdrop_path}` } /> */}
    </div>
  )
}

export default Slider