import React from "react";
import style from "./navbar.module.css";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div>
      <header className={style.navbar}>
        <nav className={style.navbar}>
          <h1>
            <Link to="/" className={style.website}>Free Stuff</Link>
          </h1>
          <ul>
            <li>
              <button
                className={style.button}
                onClick={() => navigate('/post')}
              >
                Post Item
              </button>
            </li>
            <li>
              <button className={style.button}>
                Search Item
              </button>
            </li>
            <li>
              <button className={style.button}
              onClick={() => navigate('/settings')}>
                Settings
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
