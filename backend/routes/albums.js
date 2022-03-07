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

albumRouter.post("/", createNewAlbum);
albumRouter.get("/", getAllAlbums);
albumRouter.get("/:id", getAlbumById);
albumRouter.put("/:id", updateAlbum);
albumRouter.delete("/:id", deleteAlbumById);

module.exports = albumRouter;
