/** @format */

const express = require("express");
const {
  getAllIUses,
  createNewUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/users");
const userRouter = express.Router();
//dont press enter
//write your code here

userRouter.get("/", getAllIUses);
userRouter.post("/", createNewUser);
userRouter.get("/id", getUserById);
userRouter.put("/", updateUserById);
userRouter.delete("/:id", deleteUserById);

//write your code here
module.exports = userRouter;
