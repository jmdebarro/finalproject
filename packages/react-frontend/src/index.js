import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./components/MyApp";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Post from "./components/Post";
import Search from "./components/Search";
import NotFoundPage from "./components/NotFoundPage";
import MyProfile from "./components/MyProfile"; // Import the MyProfile component
import Settings from "./components/Settings"; // Import the Settings component

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
    ),
    errorElement: <NotFoundPage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/post",
    element: <Post />
  },
  {
    path: "/search",
    element: <Search />
  },
  {
    path: "/myprofile", // Add the route for the MyProfile page
    element: <MyProfile />
  },
  {
    path: "/settings",
    element: <Settings />
  }
]);

// Initial render:
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
