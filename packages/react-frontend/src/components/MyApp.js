import Navbar from "./Navbar.js";
import Table from "./Table.js";

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
      <Navbar />
      <Table itemData={items} />
    </div>
  );
}
export default MyApp;
