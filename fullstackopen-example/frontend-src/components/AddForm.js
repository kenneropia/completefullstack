import React from 'react'
import phoneServices from '../services/persons'

const AddForm = ({
  setSuccessMessage,
  setErrorMessage,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
}) => {
  const checkIfExistPerson = (arr, obj) => {
    return arr.find((item) => {
      return item.name.toLowerCase() === obj.name.trim().toLowerCase()
    })
  }

  const addNewPerson = (event) => {
    event.preventDefault()

    if (newName.trim() !== '' || newNumber.trim() !== '') {
      let filteredPerson = checkIfExistPerson(persons, {
        name: newName,
        number: newNumber,
      })
      console.log(filteredPerson,"top")
      const personObject = {
        name: newName.trim(),
        number: newNumber.trim(),
      }
      if (filteredPerson) {
        console.log(filteredPerson)
        let check = window.confirm(`${newName} is already in the phonebook ,`)
        if (check) {
          phoneServices
            .update(filteredPerson.id, personObject)
            .then((response) => {
              
              setPersons(
                persons.map((person) =>
                  person.id !== response.id ? person : response
                )
              )
              setSuccessMessage(
                `${newName} has updated been into the phonebook`
              )
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
            })
            .catch(() => {
              setErrorMessage(
                `${newName} already been removed from the phonebook`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setPersons(persons.filter((person) => person.id !== id))
            })
        }
      } else {
        phoneServices.create(personObject).then(() => {
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Person was added successfully into server`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
      }
    }
  }

  return (
    <form onSubmit={addNewPerson}>
      <div>
        <h2>add a new number</h2>
        name:{' '}
        <input
          onChange={(event) => {
            setNewName(event.target.value)
          }}
          value={newName}
        />{' '}
        <br />
        number:{' '}
        <input
          onChange={(event) => {
            setNewNumber(event.target.value)
          }}
          value={newNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default AddForm
