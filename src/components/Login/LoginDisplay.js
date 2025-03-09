import React from "react";
import './LoginDisplay.css'
import logo from './spotify-logo.png'

function LoginDisplay(props) {
    return (
        <div id="login">
            <div id="login-avatar"><img src={logo} alt="Spotify Logo" /></div>
            <button id="login-submit" type="submit" onClick={props.onClick}>LOGIN</button>  
        </div>
    )
}

export default LoginDisplay;