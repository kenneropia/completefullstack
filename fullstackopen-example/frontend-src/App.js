import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import SearchPhone from './components/SearchPhone'
import AddForm from './components/AddForm'
import ShowNumber from './components/ShowNumber'
import {SuccessNotification,ErrorNotification} from './components/Notification'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newField, setNewField] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:4000/persons').then((response) => {
      setPersons(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage}/>
      <SearchPhone newField={newField} setNewField={setNewField} />
      <AddForm
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
      />
      <ShowNumber 
        setSuccessMessage={setSuccessMessage}
        setErrorMessage = {setErrorMessage}
        newName = {newName}
        persons={persons}
        setPersons={setPersons}
        newField={newField}
      />
    </div>
  )
}

render(<App />, document.getElementById('root'))