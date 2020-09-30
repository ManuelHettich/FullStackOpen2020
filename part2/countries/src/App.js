import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import Country from './components/Country'
import CountryList from './components/CountryList'

function App() {
  const [ searchTerm, setSearchTerm ] = useState("")
  const [ countries, setCountries ] = useState([])

  const matchingCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()))

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="App">
      find countries <input value={searchTerm} onChange={handleChange} /><br/>
      { matchingCountries.length <= 10
        ? matchingCountries.length === 1
            ? <Country country={matchingCountries[0]} />
            : <CountryList matchingCountries={matchingCountries} />
        : "Too many matches, specify another filter"
      }
    </div>
  )
}

export default App
