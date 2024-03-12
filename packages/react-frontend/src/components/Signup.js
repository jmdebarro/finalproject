import React, { useState } from "react";

function Signup(props) {
  const [creds, setCreds] = useState({
    username: "",
    pwd: "",
    phoneNumber: "",
    email: ""
  });

  return (
    <form>
      <b>Create a new account</b>
      <br />
      <label htmlFor="username">Username</label>
      <br />
      <input
        type="text"
        name="username"
        id="username"
        value={creds.username}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="password">Password</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        value={creds.pwd}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="phone number">Phone Number</label>
      <br />
      <input
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        value={creds.phoneNumber}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="email">Email Address</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        value={creds.email}
        onChange={handleChange}
      />
      <br />
      <input
        type="button"
        value={props.buttonLabel || "Sign up"}
        onClick={submitForm}
      />
    </form>
  );

  function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setCreds({ ...creds, username: value });
        break;
      case "password":
        setCreds({ ...creds, pwd: value });
        break;
      case "phoneNumber":
        setCreds({ ...creds, phoneNumber: value });
        break;
      case "email":
        setCreds({ ...creds, email: value });
        break;
    }
  }

  function submitForm() {
    props.handleSubmit(creds);
    setCreds({
      username: "",
      pwd: "",
      email: "",
      phoneNumber: ""
    });
  }
}
export default Signup;
