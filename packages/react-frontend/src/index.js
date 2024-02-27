import Reactfrom "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./components/MyApp";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import NotFoundPage from "./components/NotFoundPage";

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const container = document.getElementById("root");
const INVALID_TOKEN = "INVALID_TOKEN";
const [token, setToken] = useState(INVALID_TOKEN);
const [message, setMessage] = useState("");

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

// Initial render:
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
