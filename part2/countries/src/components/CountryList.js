import React, {useState} from 'react'
import Country from './Country'

const CountryList = ({ matchingCountries }) => {
    const [ shownCountries, setShownCountries ] = useState([])

    const handleClick = (country) => () => {
        if (shownCountries.includes(country)) {
            setShownCountries(shownCountries.filter(element => element.name !== country.name))
        } else {
            setShownCountries(shownCountries.concat(country))
        }
    }

    return(
        <div>
            { matchingCountries.map(country =>
                <div key={country.name}>
                    { country.name } <button key={country.name} onClick={handleClick(country)}>show</button><br/>
                    { shownCountries.includes(country) && <Country country={country} /> }
                </div>)}
        </div>
    )
}

export default CountryList