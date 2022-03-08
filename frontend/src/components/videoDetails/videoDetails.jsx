/** @format */
import React from "react";
import { useSelector, useDispatch } from "react-redux";


const VideoDetails = () => {
    const { videoInfo } = useSelector((state) => {
        return {
            videoInfo: state.videoInfoReducer.videoInfo,
        };
      });
      console.log(videoInfo);
  return <div className="videoDetails">
      <h1>VideoDetails</h1>
      </div>;
};

export default VideoDetails;
