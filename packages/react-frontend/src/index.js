import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./components/MyApp";
import Navbar from "./components/Navbar";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <MyApp />
      </>
    )
  }
]);
// Initial render:
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
