import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import ShowCountries from './components/ShowCountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newField, setNewField] = useState('')
  const [hasFilter, setHasFilter] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:4000/countries').then(({ data }) => {
      setCountries(data)
    })
  }, [])

  const handleChange = ({ target }) => {
    setNewField(target.value)
    if (target.value === '') setHasFilter(false)
    else setHasFilter(true)
  }

  const handleClick = (event) => {
    setNewField(event.target.id)
  }
  const filteredCountries = countries.filter((country) => {
    return country.name.toLowerCase().includes(newField.toLowerCase())
  })

  const hasExactMatch = filteredCountries.some((country) => {
    return country.name.toLowerCase() === newField.toLowerCase()
  })

  let exactFilteredCountries
  if (hasExactMatch) {
    exactFilteredCountries = filteredCountries.filter((country) => {
      return country.name.toLowerCase() === newField.toLowerCase()
    })
  }

  return (
    <div>
      <label>
        <span>find countries</span>
        <input value={newField} onChange={handleChange}></input>
      </label>
      <div>
        {hasFilter && hasExactMatch && (
          <ShowCountries countries={exactFilteredCountries} />
        )}
        { hasFilter && !hasExactMatch && (
          <ShowCountries
            countries={filteredCountries}
            handleClick={(event) => handleClick(event)}
          />
        )}
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))
