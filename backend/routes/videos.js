/** @format */

const express = require("express");
const {
  createNewVideo,
  getAllVideos,
  deleteVideoById,
  getVideoById,
  updateVideoById,
} = require("../controllers/videos");

const videoRouter = express.Router();

videoRouter.post("/", createNewVideo);
videoRouter.get("/", getAllVideos);
videoRouter.get("/id", getVideoById);
videoRouter.put("/id", updateVideoById);
videoRouter.delete("/:id", deleteVideoById);

module.exports = videoRouter;
