import React, { useState } from "react";
import MyApp from "./MyApp";
import Navbar from "./Navbar";
import Login from "./Login";
import NotFoundPage from "./NotFoundPage";

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

// Default Domain: freestuff-api.azurewebsites.net
// Where we will fetch backend info from eventually

function FrontendHandler() {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");

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
      element: <Login handleSubmit={loginUser} />
    }
  ]);
  function loginUser(creds) {
    const promise = fetch(
      `freestuff-api.azurewebsites.net/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(creds)
      }
    )
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(`Login successful; auth token saved`);
        } else {
          setMessage(
            `Login Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });

    return promise;
  }
  return (
    <div className={"container"}>
      <RouterProvider router={router} />
    </div>
  );
}

// Create a root

export default FrontendHandler;
