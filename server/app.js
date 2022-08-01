const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const config = require("./config");
const { mongoDbUrl, secret, serverPort } = config.module;

//middleware
app.use(cors());
app.use(express.json());

app.listen(serverPort);

console.log("server start on port " + serverPort);

mongoose.connect(mongoDbUrl);

//routes
const router = express.Router();
const userRoute = require("./routes/userRoute");
const placesRoute = require("./routes/placesRoute");
const timeFramesRoute = require("./routes/timeFramesRoute");
const servicesRoute = require("./routes/servicesRoute");

app.get("/", (req, res) => {
  res.send("server is listening in port 5000");
});

app.use("/", cors(), userRoute);
app.use("/", cors(), placesRoute);
app.use("/", cors(), timeFramesRoute);
app.use("/", cors(), servicesRoute);
