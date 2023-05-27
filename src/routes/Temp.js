import React, { useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom";

export const Temp = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const [ temp, setTemp ] = useState('');
    const handleTextChange = (event) => {
        setTemp(event.target.value);
    };
    const handleSubmit = () => {
        console.log(temp);
        navigate('/');
    }
    /*
    const sendTemp = () => {
        fetch("url", {
            method: "POST",
            body: data
        }).then((res) => {
            success
        }).catch((err) => {
            error
        });
    }
    */
   if (location.state !== null) {
    return (
        <div>
            <p>UID: { params.uid }</p>
            <input type="text" value={temp} onChange={handleTextChange} />
            <button onClick={handleSubmit}>submit</button>
        </div>
    )
   } else {
    return (
        <p>UID is not valid</p>
    )
   }
}