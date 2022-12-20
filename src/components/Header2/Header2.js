import React, {useContext} from 'react'
import './Header2.css'
import {Link, useNavigate} from 'react-router-dom'
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

import { ThemeContext } from '../../contexts/ThemeContext'
import { UserContext } from '../../contexts/UserContext';
import axios, { AxiosHeaders } from 'axios'
import SearchResult from '../SearchResult/SearchResult';



function Header2() {
  const apiKey=process.env.REACT_APP_API_KEY;
  const baseUrl=process.env.REACT_APP_BASE_URL;

  //note CURLY brackets here to access global state!
  const {darkMode, setDarkMode} = useContext(ThemeContext)

  const {user, setUser, token, setToken} = React.useContext(UserContext);

  const [profileOptions, setProfileOptions] = React.useState(false);

  //create state for search boar
  const [query, setQuery] = React.useState('')
  const [queryResults, setQueryResults] = React.useState([])

  //activate useNavigate hook
  const navigate = useNavigate();

  //for light/dark changing
  const handleTheme = () =>{
    //toggle
    setDarkMode(!darkMode);
    //send value to local storage
    localStorage.setItem("darkMode", !darkMode);
    //why can't you just use value of darkMode, isn't this backwards?
  }
  //const darkMode=false;

  const handleLogout = ()=>{
    //clear local storage
      localStorage.clear()
      setUser('')
      setToken('')
      //navigate to homepage
      navigate('/')
  }

  const handleSearch = (e) =>{
    //
    //console.log("search")
    //console.log(e);
    //input is targer that triggered this event
    //set query to search text from input box
    setQuery(e.target.value);

    //https://api.themoviedb.org/3/search/movie?api_key=c315ba96d8b132c0836df2e55986edc6&query=king

    axios.get(`${baseUrl}search/movie?api_key=${apiKey}&query=${e.target.value}`)
    .then(res =>{
      console.log(res.data.results)
      setQueryResults(res.data.results)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className={darkMode ? "header-container" : "header-container header-light"}>
        <Link to="/" className = "logo">CineTrail</Link>
        <div className="search-container">
            <input placeholder="Search movies..." className="search-input" 
                    onChange={handleSearch} 
                    value={query} />
            {
              query !== ''?
            <div className="search-results-container">
              {
                queryResults.map(item=> <SearchResult movie={item} setQuery={setQuery} />)
                // queryResults.map(item=><p>{item.original_title}</p>)
              }
            </div>
            :
            null
            }

        </div>
        <div className="header-buttons-container">           
            {
              darkMode?
              <div className="theme-buttons" >
                <MdOutlineLightMode onClick={handleTheme} className="theme-icon" />
                <MdOutlineDarkMode className="theme-icon theme-icon-active" />
              </div>
              :
              <div className="theme-buttons">
                <MdOutlineLightMode className="theme-icon theme-icon-active" />
                <MdOutlineDarkMode onClick={handleTheme} className="theme-icon" />
              </div>
            }
          
            {
              token?
              <div className="profile-container">
                <img src={user.image_url} className="profile-img"
                onClick={()=>setProfileOptions(!profileOptions)}/>
                <p>Welcome {user.username}</p>
                {
                  profileOptions?
                  <div className="fav-div">
                    <Link to="/myfavorites">MyFavorites</Link>
                    <p className="logout" onClick={handleLogout}>Logout</p>
                  </div>
                  :
                  null
                }
              </div>
              :
              <button className="create-account-btn"
            onClick={()=>navigate('/signup')}>Create an account</button>
            }
            
          
        </div>
    </div>
  )
}

export default Header2