import axios from 'axios';
import React, {useContext} from 'react'
import MovieCard from '../../components/MovieCard/MovieCard';
import Slider from '../../components/Slider/Slider'
import './Homepage.css'

import { ThemeContext } from '../../contexts/ThemeContext'

function Homepage() {

  const apiKey=process.env.REACT_APP_API_KEY;
  const baseUrl=process.env.REACT_APP_BASE_URL;
  //note CURLY brackets here!
  const {darkMode, setDarkMode} = useContext(ThemeContext)

   //https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1

   //need state for popular movies
   const [popularMovies, setPopularMovies] = React.useState([]);

   const [topRatedMovies, setTopRatedMovies] = React.useState([]);

   //create array with page numbers
   const pageNumbers = [1,2,3,4,5,6,7,8,9,10];
   //create state for page number
   const [page, setPage] = React.useState(3);

   React.useEffect(() => {
    //call api to get popular movies
    axios.get(`${baseUrl}movie/popular?api_key=${apiKey}&page=${page}`)
    .then(res =>{
      //console.log(res.data.results)
      setPopularMovies(res.data.results)
    })
    .catch(err=>console.log(err))

     
   }, [page])
   

   React.useEffect(() => {

    //call api to get top rated movies

    axios.get(`${baseUrl}movie/top_rated?api_key=${apiKey}`)
    .then(res =>{
      //console.log("top rated movies")
      //console.log(res.data.results)
      setTopRatedMovies(res.data.results)
      //set just the first 10
      //setTopRatedMovies(res.data.results?.slice(0, 10))
    })
    .catch(err=>console.log(err))
     
   }, [])


  return (
    <div className={darkMode ? "homepage-container" : "homepage-container homepage-light"}>
        <Slider  />
        <div className="movies-wrapper">
          <div className="popular-container">
            <h3>Popular Movies</h3>
            <div className="popular-wrapper">
              {/* Popular Movie Cards */}
              {/* {
                  popularMovies.map(item=><p>{item.title}</p>)
              } */}
              {
                  popularMovies.map(item=><MovieCard key={item.id}
                                           movie={item}
                                           imageUrl={item.poster_path} 
                                           imgHeight="300px"
                                           cardStyle="popular-card"
                                           radius="16px" />)
              }
            </div>
            <div className="page-numbers">
              <p>Select Page</p>
              {
                pageNumbers.map(num => <p key={num} 
                  onClick={()=>setPage(num)}>{num}</p>)
              }
            </div>

          </div>
          <div className="top-rated-container">
            <h3>Top Rated Movies</h3>
            <div className="top-rated-wrapper">
              {/* Top Rated Movie Cards */}
              {/* {
                  topRatedMovies.map(item=><p>{item.title}</p>)
              } */}
              {
                  topRatedMovies.map(item=><MovieCard key={item.id} 
                                         movie={item}
                                          imageUrl={item.backdrop_path} 
                                          imgHeight="100px"
                                          cardStyle="top-rated-card"
                                          radius="8px" />)
              }
            </div>

          </div>
        </div>
        {/* <div className="movies-wrapper">
          <h2>Popular Movies</h2>
          <div className="movie-container">
            <div className="popular-container">
              
              <div className="movie-cards">
                  {
                  popularMovies.map(item=><MovieCard key={item.id} movie={item} imageUrl={item.poster_path} layout="portrait-card" />)
                  }
              </div>
            </div>
            <div className="top-rated-container">
              <h2>Top Rated Movies</h2>
                  {topRatedMovies.map(item=><MovieCard movie={item} imageUrl={item.backdrop_path} 
                  layout="landscape-card" />)}
            </div>
          </div>

        </div> */}
    </div>
  )
}

export default Homepage
