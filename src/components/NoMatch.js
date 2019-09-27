import React from 'react'
import { Link } from "react-router-dom"

export default function NoMatch() {
    return (

        <div id="notfound">
            <Link to="/"><span>&#8592;GO BACK</span></Link>
            <div className="notfound">
                <div className="notfound-404">
                    <h3>Oops! Page not found</h3>
                    <h1><span>4</span><span>0</span><span>4</span></h1>
                </div>
                <h2>we are sorry, but the page you requested was not found</h2>

            </div>
        </div>
    )
}