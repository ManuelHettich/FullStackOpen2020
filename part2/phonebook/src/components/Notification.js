import React from 'react'

const style = {

}

const Notification = ({ message, status }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={`${status}`}>
            {message}
        </div>
    )
}

export default Notification