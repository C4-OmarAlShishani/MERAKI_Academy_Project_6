/** @format */

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");

app.use(cors());

app.use(express.json());

const PORT = 5000;

const userRouter = require("./routes/users");
const albumRouter = require("./routes/albums");
const videoRouter = require("./routes/videos");
const loginRouter = require("./routes/login");

app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
