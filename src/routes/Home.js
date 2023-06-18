import React from "react"
import { Link } from "react-router-dom"
import Button from '@mui/material/Button'

export const Home = () => {
    return (
        <div>
            <p>Home</p>
            <Button variant="ccontained">
                <Link to="/scan">QRコードをスキャン</Link>
            </Button>
        </div>
    )
}