import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./components/MyApp";
import Navbar from "./components/Navbar"

const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render:
root.render(<>
            <Navbar/>
            <MyApp />
            </>);