/** @format */

const express = require("express");
const {
    createNewComment,
    getAllComments,
    deleteCommentById,
    getCommentById,
    updateCommentById,
    getCommentByVideoId
} = require("../controllers/comments");

const commentRouter = express.Router();

commentRouter.post("/", createNewComment);
commentRouter.get("/", getAllComments);
commentRouter.get("/id", getCommentById);
commentRouter.get("/vid", getCommentByVideoId);
commentRouter.put("/id", updateCommentById);
commentRouter.delete("/:id", deleteCommentById);

module.exports = commentRouter;
