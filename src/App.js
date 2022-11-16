import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Homepage from './pages/Homepage/Homepage';
import {BrowserRouter, Routes, Route } from 'react-router-dom'

import ThemeContextProvider from './contexts/ThemeContext'

function App() {

  const apiKey = "c315ba96d8b132c0836df2e55986edc6";
  const baseUrl = "https://api.themoviedb.org/3/";

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeContextProvider>
          <Header />
        </ThemeContextProvider>
        <Homepage apiKey={apiKey} baseUrl={baseUrl} />
       
        
      </BrowserRouter>
    </div>
  );
}

export default App;
