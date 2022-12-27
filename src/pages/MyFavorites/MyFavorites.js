import React from 'react'
import './MyFavorites.css'
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios'
import MovieCard from '../../components/MovieCard/MovieCard';




function MyFavorites() {

  const serverUrl=process.env.REACT_APP_SERVER_URL;
  //create state to store list of favorite movies
  const [movies, setMovies] = React.useState([])

  //need user context
  const {user, setUser, token, setToken} = React.useContext(UserContext);

  //need to call api to get list of favorite movies for this user

  React.useEffect(
    ()=>{
      console.log("favorites")
      axios.get(`${serverUrl}/favoriteMovies/user/${user?._id}`)
      .then(res =>{
        
        console.log(res.data.favorites)
        setMovies(res.data.favorites)
        //movie info is coming from backend, not api
      })
      .catch(err => console.log(err))

    }, [user]
  )
 
  return (
    <div className="favorites-container">
        { 
        token?
        
          movies.map(item=><MovieCard key={item.movie[0].id}
            movie={item.movie[0]}
            imageUrl={item.movie[0].poster_path} 
            imgHeight="300px"
            cardStyle="popular-card"
            radius="16px" />)
          :
          <p>Sign in to save movies</p>
        }
    </div>
  )
}

export default MyFavorites