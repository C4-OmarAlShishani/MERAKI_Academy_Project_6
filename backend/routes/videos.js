/** @format */

const express = require("express");
const {
  createNewVideo,
  getAllVideos,
  deleteVideoById,
  getVideoById,
  updateVideoById,
  videoViews,
  getFilteredItems
} = require("../controllers/videos");

const videoRouter = express.Router();

videoRouter.post("/", createNewVideo);
videoRouter.get("/", getAllVideos);
videoRouter.get("/filter", getFilteredItems);
videoRouter.get("/id", getVideoById);
videoRouter.put("/id", updateVideoById);
videoRouter.delete("/:id", deleteVideoById);
videoRouter.put("/:id", videoViews);

module.exports = videoRouter;
