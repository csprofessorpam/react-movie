import React, {useContext} from 'react'
import './Header2.css'
import {Link, useNavigate} from 'react-router-dom'
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

import { ThemeContext } from '../../contexts/ThemeContext'
import { UserContext } from '../../contexts/UserContext';


function Header2() {

  //note CURLY brackets here to access global state!
  const {darkMode, setDarkMode} = useContext(ThemeContext)

  const {user, setUser, token, setToken} = React.useContext(UserContext);

  const [profileOptions, setProfileOptions] = React.useState(false);

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

  return (
    <div className={darkMode ? "header-container" : "header-container header-light"}>
        <Link to="/" className = "logo">CineTrail</Link>
        
        <input placeholder="Search movies..." className="search-input" />
        
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