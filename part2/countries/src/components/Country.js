import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Country = ({country}) => {
    const [ temp, setTemp ] = useState(0)
    const [ icon, setIcon ] = useState("")
    const [ windSpeed, setWindSpeed ] = useState(0)

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=dfcbf96b006f1d687366d0f0e4cc6511`)
            .then(response => {
                setTemp(response.data.main.temp)
                setIcon(response.data.weather[0].icon)
                setWindSpeed(response.data.wind.speed)
        })
    }, [country])

    return(
        <div>
            <h1>{country.name}</h1>
            capital {country.capital}<br/>
            population {country.population}<br/>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language =>
                    <li key={language.name}>{language.name}</li>
                )}
            </ul>
            <img style={{width: "100px", height: "100"}} src={country.flag} alt="flag" />
                <h2>Weather in {country.capital}</h2>
                <strong>temperature:</strong> {temp}° Celsius<br/>
                <img src={icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : "#"} alt="weather icon" /><br/>
                <strong>wind: </strong> {windSpeed} meter/sec
        </div>
    )
}

export default Country