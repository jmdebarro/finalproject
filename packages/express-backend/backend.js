// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
 
app.get("/", (req, res) => {
  res.send("Hello Slogrammers!");
});


  app.get("/users", async(req, res) => {

    try {    
      const name = req.query.name;
      const job = req.query.job;
      if (name != undefined && job != undefined) {
          let result = await userServices.findUserByNameAndJob(name, job);        
          result = { users_list: result };
          res.send(result);
      }
      else if (name != undefined) {
        let result = await userServices.findUserByName(name);
        result = { users_list: result };
        res.send(result);
      } else if (job != undefined) {
          let result = await userServices.findUserByJob(job);
          result = { users_list: result };
          res.send(result);
      }
      else {
        console.log('returning all users');
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

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

app.get("/users/:id", async(req, res) => {
  try {
    const id = req.params["id"]; //or req.params.id    
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

 

app.delete("/users/:id", async(req, res) => {
  try {
    const id = req.params.id; // Or simply req.params.id
    let result = await userServices.deleteUserById(id);
    if (result === null) { // findByIdAndDelete returns null if no document found
      res.status(404).send("Resource not found.");
    } else {
      res.status(204).send("User Deleted");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/users", async(req, res) => {
  try {
    const userToAdd = req.body;
    let newUser = await userServices.addUser(userToAdd);
    res.status(201).send({user:newUser});
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

