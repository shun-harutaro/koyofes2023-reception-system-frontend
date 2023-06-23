import React, { useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";

export const Temp = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [ temp, setTemp ] = useState('');
    const [ errors, setErrors ] = useState({
        content: '',
        isError: false,
    });

    const handleTextChange = (event) => {
        const currentVal = event.target.value;
        setTemp(currentVal);
        formValidation(currentVal);
    };

    const handleSubmit = async () => {
        /** @type {Boolean} */
        const tempFloat = parseFloat(temp)
        const sendSuccess = await sendTemp(tempFloat);
        /** TODO: 送信結果によって遷移先のバナーを変える */
        if (sendSuccess) {
            console.log("send temperature successful");
            navigate('/');
        } else {
            console.log("sending temperature failed");
            navigate('/');
        }
    };

    const formValidation = (value) => {
        const valueNum = parseFloat(value);
        if (!value.match(/^[0-9]+(\.[0-9]?)?$/)) {
            setErrors({content: '不適切な形式です', isError: true});
        } else if (valueNum < 34 || 41 < valueNum) {
            setErrors({content: '体温は34から41の範囲で入力してください', isError: true})
        } else {
            setErrors({content: '', isError: false});
        }
    }

    const createTempParams = (temperature) => {
        const dateToday = new Date();
        const dateDay1 = new Date(process.env.REACT_APP_DATE_DAY1);
        const dateDay2 = new Date(process.env.REACT_APP_DATE_DAY2);
        if (dateToday - dateDay1 < 86400000) {
            return { "temperature_day1": temperature };
        } else if (dateToday - dateDay2 < 86400000) {
            return { "temperature_day2": temperature };
        } else {
            console.error("受付時間外です")
            /** TODO: 日付が当日以外の場合のエラー処理 */
        }
    }
    /**
     * 体温を送信する
     * @param {Number} temperature 
     * @returns {Boolean} 送信が成功したか否か
     */
    const sendTemp = async (temperature) => {
        const url = process.env.REACT_APP_API_URL+`/users/${params.uid}`
        const temp_params = createTempParams(temperature);
        try {
            const res = await fetch(url, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(temp_params)
            });
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            /** NOTE: バックエンドの仕様上JSONを返さない */
            //const json = await res.json();
            //console.log(json);
            return true
        } catch(err) {
            console.error("Error: " + err);
            return false;
        }
    }

   if (location.state !== null) {
    return (
        <div>
            <h1>体温入力画面</h1>
            <Grid sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <TextField 
                error={errors.isError}
                type="decimal"
                value={temp}
                id="outlined-basic" 
                label= "体温を入力" 
                variant="outlined"
                helperText={errors.content}
                onChange={handleTextChange} 
                margin="normal"
            />
            <Button 
                variant="contained" 
                type="submit"
                onClick={handleSubmit}
                sx={{}}
            >
                体温を送信する
            </Button>
            </Grid>
        </div>
    )
   } else {
    return (
        <p>不正な画面遷移です</p>
    )
   }
}