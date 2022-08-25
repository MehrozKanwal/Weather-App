import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import {GEO_API_URL, geoApiOptions} from '../../Api'

function Search({onSearchChange}) {
    const [search , setSearch] = useState(null)

    const loadOptions = (inputValue)=> {

        return fetch(
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, 
            geoApiOptions)
	.then(response => response.json())
   
	.then((response) => {
        console.log(response)
        return{
            options: response.data.map((city) => {
                return{
                    value : `${city.latitude} ${city.longitude}` , 
                    label : `${city.name} ${city.countryCode}` ,

                }
                
            })
        }
    })
	.catch(err => console.error(err));
    }
    const handleChange = (searchData) => {
        setSearch(searchData)
        onSearchChange(searchData)
    }
  return (
    <div>
        <div className='w-name'>
            <h1 className='w-heading'> Weather App </h1>
            <img alt='weather-logo' src='weather.jpg' className='weather-logo' />
        </div>
        <AsyncPaginate 
            className='search-bar'
            placeholder="Seach for City"
            debounceTimeout={600}
            value={search}
            onChange={handleChange}
            loadOptions={loadOptions}
        />
    </div>
  )
}

export default Search