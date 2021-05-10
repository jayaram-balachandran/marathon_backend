var express = require("express");
var app = express();
const port = 3000;
var mongoose = require("mongoose");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var createError = require("http-errors");
var Participant = require("./models/participant");
var Organizer = require("./models/organizer");
var Control = require("./models/control");
const bodyParser = require("body-parser");
const fs = require("fs");
var router = express.Router();

// view engine setup

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//cors

app.use(
  cors({
    origin: ["http://localhost:4200", "http://127.0.0.1:4200"],
    credentials: true,
  })
);

//DB

var mongoose = require("mongoose");
const agent = require("./models/participant");
const organizer = require("./models/organizer");

mongoose
  .connect(
    "mongodb+srv://jayaram:password12345@cluster0-jvxnu.mongodb.net/marathon_registration?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("connection failed");
  });

//Register
app.post("/registerparticipant", function (req, res, next) {
  console.log("register", req.body);
  addToDB(req, res);
});

async function addToDB(req, res) {
  var participant = new Participant({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    DOB: req.body.DOB,
    email: req.body.email,
    paymentInfo: req.body.paymentInfo,
    creation_dt: new Date().toISOString(),
  });

  try {
    doc = await participant.save();
    return res.status(201).json(doc);
  } catch (err) {
    return res.status(501).json(err);
  }
}

//Save Event
app.put("/saveEvent", function (req, res, next) {
  console.log("register", req.body);
  addEventToDB(req, res);
});

async function addEventToDB(req, res) {
  // var control = new Control({
  //     control: "default",
  //     registrationOpen: req.body.registrationOpen,
  //     displayInfo: req.body.displayInfo,
  //   });

  try {
    var control_id = "6097fc67c8a2c5a891a3d259";
    doc = await Control.findByIdAndUpdate(control_id, {
      control: "",
      registrationOpen: req.body.registrationOpen,
      displayInfo: req.body.displayInfo,
    });
    console.log("s");
    return res.status(201).json(doc);
  } catch (err) {
    console.log("f");
    return res.status(501).json(err);
  }
}

//Get Marathon Data
app.get("/getmarathondata", function (req, res, next) {
  console.log("get");
  Organizer.find(function (err, docs) {
    if (err) {
      console.log(err);
      return res.status(501).json(err);
    } else {
      console.log("First function call : ", docs);
      return res.status(201).json(docs);
    }
  });
});

//Get Display Data

//Get Marathon Data
app.get("/getdisplaydata", function (req, res, next) {
  console.log("get");
  Control.find(function (err, docs) {
    if (err) {
      console.log(err);
      return res.status(501).json(err);
    } else {
      console.log("First function call : ", docs);
      return res.status(201).json(docs);
    }
  });
});

//Get Par Data
app.get("/getpardata", function (req, res, next) {
  console.log("get");
  Participant.find(function (err, docs) {
    if (err) {
      console.log(err);
      return res.status(501).json(err);
    } else {
      console.log("First function call : ", docs);
      return res.status(201).json(docs);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
