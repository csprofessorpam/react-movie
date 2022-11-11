import React from 'react'
import Slider from '../../components/Slider/Slider'
import './Homepage.css'


function Homepage({baseUrl, apiKey}) {

   

  return (
    <div className="homepage-container">
        <Slider apiKey={apiKey} baseUrl={baseUrl} />
    </div>
  )
}

export default Homepage