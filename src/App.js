import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Homepage from './pages/Homepage/Homepage';

function App() {

  const apiKey = "c315ba96d8b132c0836df2e55986edc6";
  const baseUrl = "https://api.themoviedb.org/3/";

  return (
    <div className="App">
      <Header />
      <Homepage apiKey={apiKey} baseUrl={baseUrl} />
      <Footer />
    </div>
  );
}

export default App;
