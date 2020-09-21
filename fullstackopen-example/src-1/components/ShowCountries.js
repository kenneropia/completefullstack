import React from 'react'
import Country from './Country'

const ShowCountries = ({ countries, handleClick }) => {
   const tooManyCountries = countries.length > 10
   const multipleCountries = countries.length > 1 && countries.length <= 10
  const singleCountry = countries.length === 1
  
  const countryList = countries.map((country) => {
    return (
      <div key={country.alpha3Code}>
        {country.name}{' '}
        <button onClick={handleClick} id={country.name}>
          Show
        </button>
      </div>
    )
      })
       
  return (
    <div>
      {tooManyCountries && 'Too many matches, specify another filter'}
      {multipleCountries && <div>{countryList}</div>}
      {singleCountry && <Country country={countries[0]} />}
    </div>
  )
      }

      export default ShowCountries
