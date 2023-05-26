import { Link } from "react-router-dom";
import React from "react";

export const Footer = () => {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/scan">Scan</Link>
            </li>
            <li>
                <Link to="/temp">Temperature</Link>
            </li>
        </ul>
    )
}