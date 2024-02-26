import React from "react";
// import  Table from "./Table";
import MainComponent from "./Item";

const items = [
  {
    image: "IMAGE",
    user: "user",
    description: "This is item info",
    _id: "1234"
  },
  {
    image: "IMAGE",
    user: "person",
    description: "This is item info",
    _id: "321"
  }
];

function MyApp() {
  return (
    <div className={"container"}>
      <MainComponent itemData={items}/>
    </div>
  );
}
export default MyApp;
