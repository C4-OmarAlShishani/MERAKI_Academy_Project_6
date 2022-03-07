/** @format */

const express = require("express");
const {login} = require("../controllers/login");
const loginRouter = express.Router();
//dont press enter
//write your code here

loginRouter.post("/", login);

//write your code here
module.exports = loginRouter;
