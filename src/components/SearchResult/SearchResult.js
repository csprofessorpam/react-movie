import React from 'react'
import {Link} from 'react-router-dom'
import './SearchResult.css'

function SearchResult({movie, setQuery}) {
  console.log("SR id ", movie.id);
  return (
    <a href={`/moviedetails/${movie.id}`}  
          className="search-link"  
          onClick={()=>setQuery('')}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
            <p>{movie.original_title}</p>
    </a>
  )
}

export default SearchResult