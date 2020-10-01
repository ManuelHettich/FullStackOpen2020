import React from 'react'

const Persons = (props) =>
    <div>
        {props.personsToShow.map((person) =>
            <div key={person.name}>
                {person.name} {person.number} <button onClick={() => props.handleDeletion(person.id)}>delete</button><br/>
            </div>)}
    </div>

export default Persons