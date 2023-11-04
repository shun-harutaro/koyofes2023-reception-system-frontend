import React, { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, Grid, TextField, Alert } from "@mui/material";
import AlertDialog from "../components/AlertDialog";

export const Temp = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [ temp, setTemp ] = useState('');
    const [ date, setDate ] = useState(0); // day1:1, day2:2, other:0
    const [ formStatus, setFormStatus ] = useState({
        disabled: false,
        message: ""
    })
    const [ validationError, setValidationError ] = useState({
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
        if (sendSuccess) {
            navigate('/', { state: { result: 'success', name: location.state.name } });
        } else {
            navigate('/', { state: { result: 'failed' } });
        }
    };

    const formValidation = (value) => {
        const valueNum = parseFloat(value);
        if (!value.match(/^[0-9]+(\.[0-9]?)?$/)) {
            setValidationError({content: '不適切な形式です', isError: true});
        } else if (valueNum < 34 || 41 < valueNum) {
            setValidationError({content: '体温は34から41の範囲で入力してください', isError: true})
        } else {
            setValidationError({content: '', isError: false});
        }
    }

    // レンダリング時に時間検証
    useEffect(() => {
        const dateToday = new Date();
        const dateDay1 = new Date(process.env.REACT_APP_DATE_DAY1);
        console.log({dateDay1});
        const dateDay2 = new Date(process.env.REACT_APP_DATE_DAY2);
        console.log({dateDay2});
        console.log(location.state.day1or2);
        if (dateToday - dateDay1 < 86400000) {
            setDate(1);
            if (location.state.day1or2 === "day2") {
                setDate(0);
                setFormStatus({disabled: true, message: "二日目のみの登録です。"});
            }
        } else if (dateToday - dateDay2 < 86400000) {
            setDate(2);
            if (location.state.day1or2 === "day1") {
                setDate(0);
                setFormStatus({disabled: true, message: "一日目のみの登録です。"});
            }
        } else {
            setDate(0);
            setFormStatus({disabled: true, message: "受付時間外です。"});
        }
    }, [])

    const createTempParams = (temperature) => {
        if (date === 1) {
            return { "temperature_day1": temperature };
        } else if (date === 2) {
            return { "temperature_day2": temperature };
        } else {
            console.error("受付時間外です");
            return {};
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
            const json = await res.json();
            console.log(json);
            return true
        } catch(err) {
            console.error("Error: " + err);
            return false;
        }
    }

   if (location.state !== null) {
    return (
        <div>
            { formStatus.disabled && <Alert severity="error">エラー：{formStatus.message}</Alert> }
            <h1>体温入力画面</h1>
            <p>登録名：{location.state.name}さん</p>
            <Grid sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <TextField
                error={validationError.isError}
                disabled={formStatus.disabled}
                inputMode="decimal"
                value={temp}
                id="outlined-basic"
                label= "体温を入力"
                variant="outlined"
                helperText={validationError.content}
                onChange={handleTextChange}
                margin="normal"
            />
            <Button
                disabled={validationError.isError || formStatus.disabled }
                variant="contained"
                type="submit"
                onClick={handleSubmit}
            >
                体温を送信する
            </Button>
            <AlertDialog />
            </Grid>
        </div>
    )
   } else {
    return (
        <p>不正な画面遷移です</p>
    )
   }
}
