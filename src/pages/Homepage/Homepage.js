import axios from 'axios';
import React from 'react'
import MovieCard from '../../components/MovieCard/MovieCard';
import Slider from '../../components/Slider/Slider'
import './Homepage.css'


function Homepage({baseUrl, apiKey}) {

   //https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1

   //need state for popular movies
   const [popularMovies, setPopularMovies] = React.useState([]);

   const [topRatedMovies, setTopRatedMovies] = React.useState([]);

   React.useEffect(() => {
    //call api to get popular movies
    axios.get(`${baseUrl}movie/popular?api_key=${apiKey}`)
    .then(res =>{
      //console.log(res.data.results)
      setPopularMovies(res.data.results)
    })
    .catch(err=>console.log(err))

    //call api to get top rated movies

    axios.get(`${baseUrl}movie/top_rated?api_key=${apiKey}`)
    .then(res =>{
      console.log("top rated movies")
      console.log(res.data.results)
      //set just the first 10
      setTopRatedMovies(res.data.results.slice(0, 10))
    })
    .catch(err=>console.log(err))
     
   }, [])
   

  return (
    <div className="homepage-container">
        <Slider apiKey={apiKey} baseUrl={baseUrl} />
        <div className="movies-wrapper">
          <h2>Popular Movies</h2>
          <div className="movie-container">
            <div className="popular-container">
              
              <div className="movie-cards">
                  {
                  popularMovies.map(item=><MovieCard movie={item} imageUrl={item.poster_path} layout="portrait-card" />)
                  }
              </div>
            </div>
            <div className="top-rated-container">
              <h2>Top Rated Movies</h2>
                  {topRatedMovies.map(item=><MovieCard movie={item} imageUrl={item.backdrop_path} 
                  layout="landscape-card" />)}
            </div>
          </div>

        </div>
    </div>
  )
}

export default Homepage