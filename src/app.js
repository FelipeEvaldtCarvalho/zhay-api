const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/index.js");
const authRouter = require("./routes/auth.js");
const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("./graphQL/index.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", router);
app.use("/api/auth", authRouter);

app.all("/graphql", createHandler({ schema }));

module.exports = app;
