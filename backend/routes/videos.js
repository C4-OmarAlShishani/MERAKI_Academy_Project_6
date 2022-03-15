/** @format */

const express = require("express");
const {
  createNewVideo,
  getAllVideos,
  deleteVideoById,
  getVideoById,
  updateVideoById,
  videoViews,
  getFilteredItems,
  addLike,
  addDisLike
} = require("../controllers/videos");

const videoRouter = express.Router();

videoRouter.post("/", createNewVideo);
videoRouter.get("/", getAllVideos);
videoRouter.post("/filter", getFilteredItems);
videoRouter.get("/id", getVideoById);
videoRouter.put("/id", updateVideoById);
videoRouter.delete("/:id", deleteVideoById);
videoRouter.put("/:id", videoViews);
videoRouter.put("/like/:id", addLike);
videoRouter.put("/dislike/:id", addDisLike);

module.exports = videoRouter;
