const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const user = require("./models/User");
const DBUSER = process.env.DBUSER;
const DBPW = process.env.DBPW;
app.use(express.json());
mongoose
  .connect(
    `mongodb+srv://${DBUSER}:${DBPW}@mycluster.abzjcvj.mongodb.net/checkpoint-RESTAPI?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

// POST :  ADD A NEW USER TO THE DATABASE
app.post("/addUser", async (req, res) => {
  try {
    let { name, phone, email } = req.body;
    const newUser = await new User({
      name,
      phone,
      email,
    });
    await newUser.save();
    res.status(200).json({ status: true, message: "Data was added" });
  } catch (error) {
    if (error) {
      console.log(error.errors);
    }
    if (error.errors["name"]) {
      res.status(401).json({ status: false, error: error.errors.name.message });
    }
  }
});
// GET :  RETURN ALL USERS
app.get("/users", async (req, res) => {
  try {
    let data = await User.find();
    res.status(200).json({ status: true, data });
  } catch (error) {
    if (error) throw error;
  }
});

// PUT : EDIT A USER BY ID
app.put("/updateUser", async (req, res) => {
  try {
    let { _id } = req.query;
    let data = await User.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).json({ status: true, data });
  } catch (error) {
    if (error) throw error;
  }
});

// DELETE : REMOVE A USER BY ID
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: "User was removed" });
  } catch (error) {
    if (error) throw error;
  }
});

app.listen(5000, (err) => {
  if (err) throw err;
  console.log("server is up and running on  port 5000");
});
