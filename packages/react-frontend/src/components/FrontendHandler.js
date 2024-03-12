import React, { useState } from "react";
import ItemsTable from "./ItemsTable";
import Navbar from "./Navbar";
import Login from "./Login";
import NotFoundPage from "./NotFoundPage";
import Post from "./Post";
import Settings from "./Settings";
// import UserProfile from "./UserProfile";
import MyProfile from "./MyProfile";
import ItemPage from "./ItemPage";
import Search from "./Search";
import Signup from "./Signup";

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
  const [currUserName, setCurrUserName] =
    useState("INVALID_USER");
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Search />
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
          <Signup handleSubmit={signupUser} />
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
          <Settings userId={currUserName} />
        </>
      )
    },
    {
      path: "/item/:itemId",
      element: (
        <>
          <Navbar />
          <ItemPage />
        </>
      )
    },
    // {
    //   path: "/userprofile",
    //   element: (
    //     <>
    //       <Navbar/>
    //       <UserProfile/>
    //     </>
    //   )
    // }
    {
      path: "/myprofile",
      element: (
        <>
          <Navbar />
          <MyProfile userId={currUserName} />
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
    item = { ...item, userId: currUserName };
    console.log(item);
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
      `https://freestuff-api.azurewebsites.net/login`,
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
          setCurrUserName(creds.username);
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
      `https://freestuff-api.azurewebsites.net/signup`,
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
          setCurrUserName(creds.username);
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
