/** @format */

const express = require("express");
const {
    createNewComment,
    getAllComments,
    deleteCommentById,
    getCommentById,
    updateCommentById,
} = require("../controllers/comments");

const commentRouter = express.Router();

commentRouter.post("/", createNewComment);
commentRouter.get("/", getAllComments);
commentRouter.get("/id", getCommentById);
commentRouter.put("/id", updateCommentById);
commentRouter.delete("/:id", deleteCommentById);

module.exports = commentRouter;
