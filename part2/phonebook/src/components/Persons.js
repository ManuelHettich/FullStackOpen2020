import React from 'react'

const Persons = (props) =>
    <div>
        {props.personsToShow.map((person) =>
            <div key={person.name}>
                {person.name} {person.number}<br/>
            </div>)}
    </div>

export default Persons