

// export default App
import React, { useState, useEffect } from "react";

const url = "https://api.openweathermap.org/data/2.5/weather?q=";

// {city name}&appid={API key}

const apiKey = "4d55e197b57913c5dfdf0c2eb5650ad8";

const App = () => {
  const [city, setCity] = useState(null);
  const [cityName, setCityName]=useState('')


  const fetchWeather = async (cityName='Bishkek') => {
    const response = await fetch(url + cityName + "&appid=" + apiKey);
    const data = await response.json();
    console.log(data);
    setCity(data);
  };
  useEffect(() => {
    fetchWeather();
  }, []);
  // function img(){
   

  // }

  if(city===null){
    return <h3>Loading</h3>
  }
  if(city.cod==404){
    return <h2>{city.message}</h2>
  }
  return (
    <div style={{backgroundColor:'lightgreen'}}>
      <div>
        <h1>City: {city.name}</h1>
        <h2>{Math.round(city.main.temp-273.15)} °C</h2>
        <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}/>
      </div>
      <div>
        <div>{city.weather[0].main}</div>
        <div>Humidity: {city.main.humidity}</div>
        <div>Wind: {city.wind.speed}</div>
        <input 
        value={cityName}
        onChange={(e)=>setCityName(e.target.value)}
        />
        <button onClick={()=>fetchWeather(cityName)}>Search</button>

      </div>
    </div>
  );
};

export default App;