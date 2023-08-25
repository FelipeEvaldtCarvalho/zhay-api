const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/index.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(router);

module.exports = app;
