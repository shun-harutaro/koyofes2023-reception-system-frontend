import React, { useState } from "react"
import { useLocation } from "react-router-dom"

export const Temp = () => {
    const location = useLocation();
    console.log(location.state.UID.text);
    const [ temp, setTemp ] = useState('');
    const handleTextChange = (event) => {
        setTemp(event.target.value);
    };
    const handleSubmit = () => {
        console.log(temp);
    }

    return (
        <div>
            <p>Temp {location.state.UID.text}</p>
            <input type="text" value={temp} onChange={handleTextChange} />
            <button onClick={handleSubmit}>submit</button>
        </div>
    )
}