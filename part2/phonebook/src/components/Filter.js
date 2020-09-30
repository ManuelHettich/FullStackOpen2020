import React from 'react'

const Filter = (props) =>
    <div>
        filter shown with <input value={props.nameFilter} onChange={props.handleFilterChange} />
    </div>

export default Filter