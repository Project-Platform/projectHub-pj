const express = require("express");
const mongoose = require("mongoose");
const User = require("./routes/user.js");
const projectUser= require("./routes/projectCheck.js");
const cors = require("cors");
const app = express();
require("dotenv").config();              // Load environment variables from a .env file

// Retrieve MongoDB connection URI from environment variables
const mongoURI = process.env.MONGODB_URL;

// Retrieve the port from environment variables
const port = process.env.PORT;


mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });
app.use(express.json());
app.use(cors(
  {
    origin:["https://project-hub-pj-yzhg.vercel.app/"],
    methods:["POST","GET"],
    credentials: true
  }
));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello, this is the default route!');
});

app.use('/user',User);
app.use('/project',projectUser);
