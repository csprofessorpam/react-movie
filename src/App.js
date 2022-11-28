import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Homepage from './pages/Homepage/Homepage';

import {BrowserRouter, Routes, Route } from 'react-router-dom'

import ThemeContextProvider from './contexts/ThemeContext'
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import MovieDetails from './pages/MovieDetails/MovieDetails';

function App() {

  //get values from .env file
  const apiKey=process.env.REACT_APP_API_KEY;
  const baseUrl=process.env.REACT_APP_BASE_URL;
  //console.log("api key" + apiKey);
  //console.log("base url" + baseUrl);

  //const apiKey = "c315ba96d8b132c0836df2e55986edc6";
  //const baseUrl = "https://api.themoviedb.org/3/";

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage  />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/moviedetails/:movieId" element={<MovieDetails apiKey={apiKey} baseUrl={baseUrl} />} />
          </Routes>
        </ThemeContextProvider>
        {/* <Homepage apiKey={apiKey} baseUrl={baseUrl} /> */}
       
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
