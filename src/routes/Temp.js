import React, { useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom";

export const Temp = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
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

    const handleSubmit = async () => {
        const result = await sendTemp(temp);
        console.log(result);
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

    const createTempParams = (temp) => {
        const dateToday = new Date();
        const dateDay1 = new Date(process.env.REACT_APP_DATE_DAY1);
        const dateDay2 = new Date(process.env.REACT_APP_DATE_DAY2);
        if (dateToday - dateDay1 < 86400000) {
            return { "temperature_day1": temp };
        } else if (dateToday - dateDay2 < 86400000) {
            return { "temperature_day2": temp };
        } else {
            return { "temperature_day1": temp};
            /** TODO: error controll */
        }
    }

    const sendTemp = async (temperature) => {
        const url = process.env.REACT_APP_API_URL+`/users/${params.uid}`
        const temp_params = createTempParams(temperature);
        const res = await fetch(url, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(temp_params)
        });
        const json = await res.json();
        return json;
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