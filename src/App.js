
import './App.css';
import Currentweather from './component/current-weather/Currentweather';
import Search from './component/Search/Search';
import {WEATHER_API_URL, WEATHER_API_KEY} from './Api'
import { useState } from 'react';
import Forecast from './component/forecast/Forecast';

function App() {
  const [currentWeater , setCurrentWeather] = useState(null);
  const [forecast , setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ")
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`);
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async(response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({city: searchData.label , ...weatherResponse});
        setForecast({city: searchData.label , ...forecastResponse});
      })
      .catch((err) => {
        console.log(err);
      })
    }
  console.log(currentWeater)
  console.log(forecast)
  return (
    <div className="App">
    <div className='container'>
      <Search onSearchChange={handleOnSearchChange}/>  
      { currentWeater && <Currentweather  data={currentWeater}/>}
      {forecast && <Forecast data={forecast} />}
    </div>
    
      
    </div>
  );
}

export default App;
