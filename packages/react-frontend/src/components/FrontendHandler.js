import React, { useState } from "react";
import ItemsTable from "./ItemsTable";
import Navbar from "./Navbar";
import Login from "./Login";
import NotFoundPage from "./NotFoundPage";
import Post from "./Post";
import Settings from "./Settings";

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
          <ItemsTable />
        </>
      ),
      errorElement: <NotFoundPage />
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <Login handleSubmit={loginUser} />
        </>
      )
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar />
          <Login
            handleSubmit={signupUser}
            buttonLabel="Sign Up"
          />
        </>
      )
    },
    {
      path: "/post",
      element: (
        <>
          <Navbar />
          <div className="post-container">
            <h1>Post an Item</h1>
            <Post handleSubmit={postItem} />
          </div>
        </>
      )
    },
    {
      path: "/settings",
      element: (
        <>
          <Navbar />
          <Settings />
        </>
      )
    }
  ]);

  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`
      };
    }
  }
  function postItem(item) {
    console.log("handleSubmit");
    const promise = fetch(
      "https://freestuff-api.azurewebsites.net/items",
      {
        method: "POST",
        headers: addAuthHeader({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(item)
      }
    );
    return promise;
    return;
  }

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

  function signupUser(creds) {
    const promise = fetch(
      `freestuff-api.azurewebsites.net/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(creds)
      }
    )
      .then((response) => {
        if (response.status === 201) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`
          );
        } else {
          setMessage(
            `Signup Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
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
