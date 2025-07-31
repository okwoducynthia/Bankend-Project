const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
// import express from "express"
const taskRoutes = require("./Routes/TaskRoutes");
const connectDB = require("./Config/db");
const bodyParser = require('body-parser')
const cors = require('cors')

const server = express();
connectDB();
const port = process.env.PORT || 8000;
// The (||8000 is written so that if the server does not read at 7000 it would fall back to it but its not compulsory)
server.use(cors())
const jsonParser = bodyParser.json()
server.use(jsonParser);
server.use("/Task", taskRoutes);

// const studentInfo = [
//   {
//     "id": 1,
//     "title": "School",
//     "isCool": false
//   },
//   {
//     "id": 2,
//     "title": "Church",
//     "isCool": true
//   },
//   {
//     "id": 3,
//     "title": "Home",
//     "isCool": false
//   }
// ]

//   server.get("/info", (req, res)=>{
//     res.status(200).json({
//       message: "Successful",
//       studentInfo,
//     })
//   })

//   server.get("/home", (req, res)=>{
//     res.send("I Iove my country Nigeria");
//   })

// server.get("/people", (req, res)=>{
//   const people = [
//     {
//       "id": 1,
//       "firstName": "Chris",
//       "lastName": "Henry",
//       isAdmin: false
//     },
//     {
//       "id": 2,
//       "firstName": "Emeka",
//       "lastName": "John",
//       isAdmin: true
//     },
//     {
//       "id": 3,
//       "firstName": "Jay",
//       "lastName": "Son",
//       isAdmin: false
//     },
//   ]
//   res.status(200).json({message: "Successful",
//     people,
//   });
// })

server.listen(port, () =>
  console.log(`Server running on port: http://localhost:${port}`.yellow)
);
