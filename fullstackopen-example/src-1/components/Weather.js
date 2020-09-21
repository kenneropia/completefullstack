import React, { useState, useEffect } from 'react'
import axios from 'axios'
import WeatherInfo from './WeatherInfo'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({})
  const params = {
    query: capital,
    access_key: process.env.REACT_APP_API_KEY,
  }
  
  useEffect(() => {
    let source = axios.CancelToken.source()
    axios
      .get(`http://api.weatherstack.com/current`, {
        params: params,
        cancelToken: source.token,
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          setHasCondition(false)
        
          console.log('Request canceled', error.message)
        } else {
          throw error
        }
      })
      .then(({ statusText, data }) => {
        if (statusText === 'OK') {
          setWeather(data)
          setHasCondition(true)
        }
      })
      .catch((error) => {
        console.log(error.config)
      })

    return () => {
      source.cancel('Weather component is unmounting')
    }
  }, [capital])

  return <div>{weather.request && <WeatherInfo weather={weather} />}</div>
}

export default Weather
