
  import React, { useState } from "react";
import axios from "axios";


export default function SearchWeather(){
  let [city, setCity] = useState("");
  let [message, setMessage] = useState(false);
  let [weather, setWeather] = useState({});

  function displayWeather(response) {
    setMessage(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2af71c45aee3a26db7f753cad13a25f1&units=metric`;
    axios.get(url).then(displayWeather);
   
  }
  function searchCity(event) {
    setCity(event.target.value);
  }
  let form = (
    <form className="search" onSubmit={handleSubmit} >
      <input type="search" placeholder="Enter a city..."  autoFocus="on" onChange={searchCity} />
      <button type="submit"> Search </button>
    </form>
  );
  
  if (message) {
    return (
      <div className="row">
        {form}
       <strong className="Maincity">{city} </strong> 
       <p className="temperature">
        temperature:{Math.round(weather.temperature)}°C </p>
        <div className="col-6">
        
        <ul className="totallist">
          <li> Humidity:{weather.humidity}%</li>
          <li> wind:{weather.wind} km/h </li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
        </div>
      </div>
    );
  } else {
    return form;
  }
}
