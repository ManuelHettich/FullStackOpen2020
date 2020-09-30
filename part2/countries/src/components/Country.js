import React from 'react'

const Country = ({country}) => {
    return(
        <div>
            <h1>{country.name}</h1>
            capital {country.capital}<br/>
            population {country.population}<br/>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img style={{width: "100px", height: "100"}} src={country.flag} alt="flag" />
        </div>
    )
}

export default Country