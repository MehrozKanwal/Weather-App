import React from 'react'
import { Accordion,AccordionItem,
   AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion'
import "./Forecast.css"
const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday', 'Sunday']
function Forecast({data}) {
  const dayInWeeK = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInWeeK, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInWeeK))
  console.log(forecastDays)
  return (
    <div>
      <label className='title'>Daily</label>
      <Accordion allowZeroExpanded>
      {data.list.splice(0,7).map((item, idx) => (
        <AccordionItem key={idx}>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className='daily-item'>
                <img alt='weather' className='weather-small' src={`icons/${item.weather[0].icon}.png`} 
                />
                <label className='day'>{forecastDays[idx]} </label>
                <label className='description'>{item.weather[0].description} </label>
                <label className='min-max'>{Math.round(item.main.temp_min)} °C / 
                {Math.round(item.main.temp_max)} </label>
                <label className='min-max'> °C  </label>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className='grid'>
              <div className='display-grid'>
                <label>Pressure</label>
                <label> {item.main.pressure} hpa</label>
              </div>
              <div className='display-grid'>
                <label>Humidity</label>
                <label> {item.main.humidity} %</label>
              </div>
              <div className='display-grid'>
                <label>Feels Like</label>
                <label> {Math.round(item.main.feels_like)} °C</label>
              </div>
              <div className='display-grid'>
                <label>Wind Speed</label>
                <label> {item.wind.speed} m/s</label>
              </div>
              <div className='display-grid'>
                <label>Cloud</label>
                <label> {item.clouds.all} %</label>
              </div>
              <div className='display-grid'>
                <label>Sea-level</label>
                <label> {item.main.sea_level} m</label>
              </div>
            </div>
          </AccordionItemPanel>
        </AccordionItem>
       
      ))
      }
        
      </Accordion>
    </div>
  )
}

export default Forecast