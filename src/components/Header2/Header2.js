import React, {useContext} from 'react'
import './Header2.css'
import {Link, useNavigate} from 'react-router-dom'
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

import { ThemeContext } from '../../contexts/ThemeContext'


function Header2() {

  //note CURLY brackets here!
  const {darkMode, setDarkMode} = useContext(ThemeContext)

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

  return (
    <div className={darkMode ? "header-container" : "header-container header-light"}>
        <Link to="/" className = "logo">CineTrail</Link>
        {/* <div className="search-container"> */}
          <input placeholder="Search movies..." className="search-input" />
        {/* </div> */}
        <div className="header-buttons-container">
          {/* <div className="theme-button-container"> */}
            
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
          {/* </div> */}
          {/* <div> */}
            <button className="create-account-btn"
            onClick={()=>navigate('/signup')}>Create an account</button>
          {/* </div> */}
        </div>
    </div>
  )
}

export default Header2