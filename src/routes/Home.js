import React from "react"
import { Link } from "react-router-dom"
import Button from '@mui/material/Button'

export const Home = () => {
    return (
        <div>
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