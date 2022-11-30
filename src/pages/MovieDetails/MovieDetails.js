import axios from 'axios';
import React from 'react'
import {useParams} from 'react-router-dom'
import './MovieDetails.css'

//need to grab param



function MovieDetails({baseUrl, apiKey}) {
  //need to get the param
  const params = useParams();
  //console.log("param is " , params.movieId);

  //now you need to request data from api
  //store in state
  const [selectedMovie, setSelectedMovie] = React.useState();


  React.useEffect(
    ()=>{

      console.log(`${baseUrl}movie/${params.movieId}?api_key=${apiKey}`)
      axios.get(`${baseUrl}movie/${params.movieId}?api_key=${apiKey}`)
      .then(res=>{
        console.log(res.data)
        setSelectedMovie(res.data)
      })
      .catch(err=>console.log(err))

    }, []
  )

  return (
    <div className="details-container">
      <p>{selectedMovie?.title}</p>
    </div>
  )
}

export default MovieDetails