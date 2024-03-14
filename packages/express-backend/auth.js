import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userServices from "./user-services.js";

const test = dotenv.config();
console.log("DOTENV" + test);

export function registerUser(req, res) {
  const { username, pwd, phoneNumber, email } = req.body; // from Signup.js form
  if (!username || !pwd || !phoneNumber || !email) {
    res.status(400).send("Bad request: Invalid input data.");
    return;
  }
  userServices.findUserByUserName(username).then((result) => {
    if (result.length > 0) {
      res.status(409).send("Username already taken");
      return;
    }
  });
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(pwd, salt))
    .then((hashedPassword) => {
      generateAccessToken(username).then((token) => {
        console.log("Token:", token);
        res.status(201).send({ token: token });
        addUser({
          userName: username,
          password: hashedPassword,
          phoneNumber: phoneNumber,
          email: email
        });
      });
    });
}

async function addUser(userToAdd) {
  try {
    await userServices.addUser(userToAdd);
  } catch (error) {
    console.error(error);
  }
}

function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}

//middleware to verify the user is logged in before making protected API calls
export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (error, decoded) => {
        if (decoded) {
          next();
        } else {
          console.log("JWT error:", error);
          res.status(401).end();
        }
      }
    );
  }
}

export function loginUser(req, res) {
  const { username, pwd } = req.body; //from Login.js form
  userServices.findUserByUserName(username).then((results) => {
    if (results.length == 0) {
      res.status(404).send("Username Not Found");
    } else {
      bcrypt
        .compare(pwd, results[0].password)
        .then((matched) => {
          if (matched) {
            generateAccessToken(username).then((token) => {
              res.status(200).send({ token: token });
            });
          } else {
            // invalid password
            res.status(401).send("Unauthorized");
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(401).send("Unauthorized");
        });
    }
  });
}
