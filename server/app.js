const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const app = express();
require('dotenv').config()
// const config = require("./config");
// const { mongoDbUrl, secret, serverPort } = config.module;

const listenPort =  process.env.SERVER_PORT
const dbUrl =  process.env.DB_URL


//middleware

const whitelist = ['http://bookin.owliedev.pl', 'http://owliedev.pl','http://localhost']

const corsOption = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
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
const contactMsgsRoute = require('./routes/contactFormMsgs')

app.get("/", (req, res) => {
  res.send("server is listening");
});

app.use("/", cors(), userRoute);
app.use("/", cors(), placesRoute);
app.use("/", cors(), timeFramesRoute);
app.use("/", cors(), servicesRoute);
app.use("/", cors(), termsRoute);
app.use("/", cors(), contactMsgsRoute);
