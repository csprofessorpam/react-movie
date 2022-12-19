import React from 'react'
import {Link} from 'react-router-dom'
import './SearchResult.css'

function SearchResult({movie, setQuery}) {
  return (
    <Link to={`/moviedetails/${movie.id}`}  className="search-link"  
           onClick={()=>setQuery('')}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
        <p>{movie.original_title}</p>
    </Link>
  )
}

export default SearchResult