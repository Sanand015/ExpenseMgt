import React from "react";
import "./Nav.css"
import {  Link } from "react-router-dom";

export default function Nav(){

    return(
        <header>
        <nav class="navbar">
            <ul>
                <li><a href="#">Expense Management</a></li>
                <li><Link to="/home">Home</Link> </li>
                <li><Link to="/">Logout</Link></li>
                
            </ul>
        </nav>
    </header>
    )
}