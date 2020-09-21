import React from 'react'

const WeatherInfo = ({weather}) => {
  console.log(weather)
  return (
    <>
      <h3>Weather in {weather.request.query}</h3>
      <div>
        <span>
          <strong>Description: </strong>
          {weather.current.weather_descriptions[0]}
        </span>
        <div>
          <img
            alt={'Weather icon'}
            src={weather.current.weather_icons[0]}
          ></img>
        </div>
      </div>
      <div>
        <span>
          <strong>Temperature: </strong>
          {weather.current.temperature}
        </span>
      </div>
      <div>
        <span>
          <strong>Wind: </strong>
          {weather.current.wind_speed}m/s {weather.current.wind_dir}
        </span>
      </div>
    </>
  )
}

export default WeatherInfo