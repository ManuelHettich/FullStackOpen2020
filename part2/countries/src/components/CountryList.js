import React from 'react'

const CountryList = ({matchingCountries}) => {
    return(
        <div>
            {matchingCountries.map(country =>
                <div key={country.name}>
                    {country.name}<br/>
                </div>)}
        </div>
        
    )
}

export default CountryList