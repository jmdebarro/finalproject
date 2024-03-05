import React from "react";
import { Link } from "react-router-dom";
import style from "./settings.module.css"

function Settings() {
    return <div className={style.container}>
        <button className={style.button}><Link to="/login">Log In</Link></button>
        <button className={style.button}><Link to="/signup">Sign Up</Link></button>
    </div>
}
export default Settings;