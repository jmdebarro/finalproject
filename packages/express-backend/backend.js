// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";
import itemServices from "./item-services.js";
import {
  authenticateUser,
  registerUser,
  loginUser
} from "./auth.js";
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Hello Slogrammers!");
});

// All api requests now go to freestuff-api.azurewebsites.net
app.listen(process.env.PORT || port, () => {
  console.log("Listening at freestuff-api.azurewebsites.net.");
});

// USER METHODS

app.get("/users", async (req, res) => {
  try {
    const userName = req.query.userName;
    if (userName != undefined) {
      console.log(
        "returning all users with userName " + userName
      );
      let result =
        await userServices.findUserByUserName(userName);
      res.send(result);
    } else {
      console.log("returning all users");
      let result = await userServices.getUsers();
      console.log(JSON.stringify(result, null, 2));
      result = { users_list: result };
      res.send(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params["id"];
    let result = await userServices.findUserById(id);
    console.log(JSON.stringify(result, null, 2));
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let result = await userServices.deleteUserById(id);
    if (result === null) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(204).send("User Deleted");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/users", async (req, res) => {
  try {
    const userToAdd = req.body;
    let newUser = await userServices.addUser(userToAdd);
    res.status(201).send({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/signup", registerUser);
app.post("/login", loginUser);

app.get("/items", async (req, res) => {
  try {
    const name = req.query.name;
    const filters = req.query.filters;
    const tags = req.query.tags;
    const userId = req.query.userId;
    if (filters != undefined) {
      let result = await itemServices.findItemByTags(filters);
      result = { items_list: result };
      res.send(result);
    } else if (tags != undefined) {
      let result = await itemServices.findItemByTags(tags);
      result = { items_list: result };
      res.send(result);
    } else if (name != undefined) {
      let result = await itemServices.findItemByName(name);
      result = { items_list: result };
      res.send(result);
    } else {
      console.log("returning all items");
      let result = await itemServices.getItems(
        name,
        tags,
        userId
      );
      result = { items_list: result };
      res.send(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/items/:id", async (req, res) => {
  try {
    const id = req.params["id"]; //or req.params.id
    let result = await itemServices.findItemById(id);
    console.log(JSON.stringify(result, null, 2));
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/items/:id", async (req, res) => {
  try {
    console.log(req);
    const id = req.params.id; // Or simply req.params.id
    let result = await itemServices.deleteItemById(id);
    if (result === null) {
      // findByIdAndDelete returns null if no document found
      res.status(404).send("Resource not found.");
    } else {
      res.status(204).send("Item Deleted");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/items", authenticateUser, async (req, res) => {
  try {
    const itemToAdd = req.body;
    console.log("Logging data");
    console.log(itemToAdd);

    let newItem = await itemServices.addItem(itemToAdd);
    res.status(201).send({ item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.patch("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const partialUpdates = req.body;

    let updatedItem = await itemServices.updateItemById(
      id,
      partialUpdates
    );

    if (updatedItem) {
      res.status(200).send({ item: updatedItem });
    } else {
      res.status(404).send({ message: "Item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
