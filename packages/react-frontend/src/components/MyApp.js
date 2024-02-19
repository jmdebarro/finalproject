import  Table from "./Table";
import MainComponent from "./Item";

const items = [
  {
    image: "here",
    user: "user",
    description: "This is item info",
    _id: "1234"
  },
  {
    image: "there",
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
