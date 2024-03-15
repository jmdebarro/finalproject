import React, { useState, useEffect, useRef } from "react";
import style from "./navbar.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import menuButtonImage from "./Menu_Button.png";
import Search from "./Search";

export default function Navbar() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const sidebarContent = (
    <div
      ref={sidebarRef}
      className={
        sidebarOpen ? style.sidebarOpen : style.sidebarClosed
      }
    >
      <button
        className={style.sidebarButton}
        onClick={() => navigate("/MyProfile")}
      >
        My Profile
      </button>
      <button
        className={style.sidebarButton}
        onClick={() => navigate("/settings")}
      >
        Settings
      </button>
    </div>
  );

  return (
    <div>
      <header className={style.navbar}>
        <nav className={style.navbar}>
          <h1>
            <Link to="/" className={style.website}>
              Free Stuff
            </Link>
          </h1>
          <ul>
            <li>
              <button
                className={style.button}
                onClick={() => navigate("/post")}
              >
                Post Item
              </button>
            </li>
          </ul>
          <button
            className={style.menuButton}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            id="menu"
          >
            <img src={menuButtonImage} alt="Menu" />
          </button>
        </nav>
      </header>
      {showSearch && <Search />}
      {sidebarContent}
    </div>
  );
}
