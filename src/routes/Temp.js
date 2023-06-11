import React, { useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom";

export const Temp = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const [ temp, setTemp ] = useState('');
    const [ errors, setErrors ] = useState({
        content: '',
        isError: true,
    });
    const handleTextChange = (event) => {
        const currentVal = event.target.value;
        setTemp(currentVal);
        formValidation(currentVal);
    };
    const handleSubmit = () => {
        console.log(temp);
        navigate('/');
    };
    const formValidation = (value) => {
        const valueNum = parseFloat(value);
        if (!value.match(/^[0-9]+(\.[0-9]?)?$/)) {
            setErrors({...errors, content: '不適切な形式です'});
        } else if (valueNum < 34 || 41 < valueNum) {
            setErrors({...errors, content: '体温は34から41の範囲で入力してください'})
        } else {
            setErrors({...errors, content: ''});
        }
    }
    const sendTemp = (data) => {
        fetch("url", {
            method: "POST",
            body: data
        }).then((res) => {
        }).catch((err) => {
        });
    }
   if (location.state !== null) {
    return (
        <div>
            <p>UID: { params.uid }</p>
            <p>{ errors.content }</p>
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