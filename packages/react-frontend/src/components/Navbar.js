import React from "react";
import style from "./navbar.module.css";

export default function Navbar() {
  return (
    <div>
      <header className={style.navbar}>
        <nav className={style.navbar}>
          <h1>
            <div className={style.website}> Free Stuff </div>
          </h1>
          <ul>
            <li>
              <button className={style.button}>
                Post Item
              </button>
            </li>
            <li>
              <button className={style.button}>
                Search Item
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
