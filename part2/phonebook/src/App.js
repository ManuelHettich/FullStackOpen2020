import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ status, setStatus] = useState(null)

  const personsToShow = nameFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNameFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const prevPerson = persons.find(person => person.name === newName)
        personService
          .update(prevPerson.id,
            {
              ...prevPerson,
              number: newNumber
            })
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))

            setStatus('success')
            setMessage(`Updated ${returnedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setStatus('error')
            setMessage(`Information of ${prevPerson.name} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            
            setPersons(persons.filter(person => person.id !== prevPerson.id))
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")

          setStatus('success')
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleDeletionOf = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} status={status} />
      
      <Filter
        nameFilter={nameFilter}
        handleFilterChange={handleFilterChange}
      />

      <h2>Add a new Person</h2>
      
      <PersonForm
        addPerson={addPerson} 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons
        personsToShow={personsToShow}
        handleDeletion={handleDeletionOf}
      />
    </div>
  )
}

export default App