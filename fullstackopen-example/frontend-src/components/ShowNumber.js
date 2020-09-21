import React from 'react'
import phoneServices from '../services/persons'

const ShowNumber = ({
  setSuccessMessage,
  setErrorMessage,
  persons,
  setPersons,
  newField,
}) => {
  const filteredPersons = newField.trim()
    ? persons.filter((item) => {
        return item.name.toLowerCase().includes(newField.toLowerCase())
      })
    : persons

  const handleDelete = (id) => {
    phoneServices
      .remove(id)
      .then((reponse) => {
        console.log(reponse)
        setPersons(persons.filter((person) => person.id !== id))
      }).then(() => {
      setSuccessMessage(`Person has been deleted successly`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }).catch((error) => {
      setErrorMessage(`Person was already removed from server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setPersons(persons.filter((person) => person.id !== id))
    })
  }
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        <ul>
          {filteredPersons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}
              <button
                onClick={() => {
                  handleDelete(person.id)
                }}
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ShowNumber
