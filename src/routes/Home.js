import React from "react"
import { Link } from "react-router-dom"
import Button from '@mui/material/Button'

export const Home = () => {
    return (
        <div>
            <p>Top page</p>
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