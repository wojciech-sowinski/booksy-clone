const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
// const config = require("./config");
// const { mongoDbUrl, secret, serverPort } = config.module;

const listenPort =  process.env.SERVER_PORT
const dbUrl =  process.env.DB_URL


//middleware

const corsOption = {
  origin: 'http://bookin.owliedev.pl',
  credentials: true,
}
app.use(cors());



app.use(express.json());

app.listen(listenPort);

console.log("server start on port " + listenPort);

mongoose.connect(dbUrl);

//routes
const router = express.Router();
const userRoute = require("./routes/userRoute");
const placesRoute = require("./routes/placesRoute");
const timeFramesRoute = require("./routes/timeFramesRoute");
const servicesRoute = require("./routes/servicesRoute");
const termsRoute = require('./routes/termsRoute')

app.get("/", (req, res) => {
  res.send("server is listening");
});

app.use("/", cors(), userRoute);
app.use("/", cors(), placesRoute);
app.use("/", cors(), timeFramesRoute);
app.use("/", cors(), servicesRoute);
app.use("/", cors(), termsRoute);
