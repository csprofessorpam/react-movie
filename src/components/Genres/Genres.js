import React from 'react'
import axios from 'axios'
import './Genres.css'

function Genres({movieGenres}) {

  const apiKey=process.env.REACT_APP_API_KEY;
  const baseUrl=process.env.REACT_APP_BASE_URL;

  //need to get the array of genre names and ids from api

  //endpoint is
  //https://api.themoviedb.org/3/genre/movie/list?api_key=c315ba96d8b132c0836df2e55986edc6

  //create state to store the genres list
  const [allGenres, setAllGenres] = React.useState([])

  React.useEffect(() => {
    //call api
    axios.get(`${baseUrl}genre/movie/list?api_key=${apiKey}`)
    .then(res=>{
      //console.log(res.data.genres)
      setAllGenres(res.data.genres)
    })
    .catch(err => console.log(err))
  }, [movieGenres])

  const genreList = ()=>{
    const glist=[];
    movieGenres?.map(id =>{
      
      //find name for this id
      for (let i = 0; i < allGenres.length; i++){
        if (id === allGenres[i].id){
          glist.push(allGenres[i].name)
        }
      }
    })
    //console.log(glist.join());
    return glist.join(", ");
    //return glist;

  }
  
  return (
    <div className="genre-container">
      {/* <p>Genres:&nbsp;</p> */}
      <p>Genres:&nbsp;&nbsp;{genreList()}</p>
      {/* {
        movieGenres.map(id =>{
          //find name for this id
          for (let i = 0; i < allGenres.length; i++){
            if (id === allGenres[i].id){
              return <p>{allGenres[i].name},&nbsp;</p>
            }
          }
        })
      } */}
    </div>
  )
}

export default Genres