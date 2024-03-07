import React from "react";
import FrontendHandler from "./components/FrontendHandler.js";
import ReactDOMClient from "react-dom/client";
const container = document.getElementById("root");

// Initial render:
const root = ReactDOMClient.createRoot(container);

root.render(
  <div>
    <FrontendHandler />
  </div>
);
