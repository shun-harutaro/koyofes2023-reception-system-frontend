import React from "react"
import { Link, useLocation } from "react-router-dom"
import Button from '@mui/material/Button'
import { Alert } from "@mui/material"

export const Home = () => {
    const location = useLocation();
    const prevProcedureResult = location.state ? location.state.result : '';
    return (
        <div>
            { prevProcedureResult === 'success' && <Alert severity="success">
                {location.state.name}さんの体温は正常に送信されました。
            </Alert> }
            { prevProcedureResult === 'failed' && <Alert severity="error">
                体温の送信に失敗しました。
            </Alert> }
            <h1>ホーム</h1>
            <p>下のボタンを押して、QRコードを読み込んでください</p>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/scan"
            >
                 QRコードをスキャン
            </Button>
        </div>
    )
}