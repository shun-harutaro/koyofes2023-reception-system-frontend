import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Temp = ({ message }) => {
    const navigate = useNavigate();
    const [ temp, setTemp ] = useState('');
    const handleTextChange = (event) => {
        setTemp(event.target.value);
    };
    const handleSubmit = () => {
        console.log(temp);
        navigate('/', {state: {message: '成功',type: 'success'}});
    }

    return (
        <div>
            <p>Temp {message}</p>
            <input type="text" value={temp} onChange={handleTextChange} />
            <button onClick={handleSubmit}>submit</button>
        </div>
    )
}