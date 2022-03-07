/** @format */

const express = require("express");
const {
    createNewAlbum,
    updateAlbum,
    getAllAlbums,
    getAlbumById,
    deleteAlbumById,
} = require("../controllers/albums");
const albumRouter = express.Router();

userRouter.post("/", createNewAlbum);
userRouter.get("/", getAllAlbums);
userRouter.get("/:id", getAlbumById);
userRouter.put("/:id", updateAlbum);
userRouter.delete("/:id", deleteAlbumById);

module.exports = albumRouter;
