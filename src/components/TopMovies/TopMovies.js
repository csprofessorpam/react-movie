import React from 'react'
import './TopMovies.css'
import axios from 'axios'
import MovieCard from '../MovieCard/MovieCard';


function TopMovies() {
    const apiKey=process.env.REACT_APP_API_KEY;
  const baseUrl=process.env.REACT_APP_BASE_URL;

  //create state to hold movies
  const [topRatedMovies, setTopRatedMovies] = React.useState([]);

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
    <div className="top-rated-container">
            <h3>Top Rated Movies</h3>
            <div className="top-rated-wrapper">
              
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
  )
}

export default TopMovies