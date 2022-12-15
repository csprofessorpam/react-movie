import React from 'react'
import './PopularMovies.css'
import axios from 'axios'
import MovieCard from '../MovieCard/MovieCard';


function PopularMovies() {

    //needs api info
    const apiKey=process.env.REACT_APP_API_KEY;
    const baseUrl=process.env.REACT_APP_BASE_URL;
    const imgBase=process.env.REACT_APP_IMAGE_BASE_URL;

    //need state for popular movies
   const [popularMovies, setPopularMovies] = React.useState([]);


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

  return (
    <div className="popular-container">
            <h3>Popular Movies</h3>
            <div className="popular-wrapper">
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
  )
}

export default PopularMovies