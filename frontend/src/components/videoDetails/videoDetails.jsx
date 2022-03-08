/** @format */
import React from "react";
import { useSelector, useDispatch } from "react-redux";


const VideoDetails = () => {
    const { item } = useSelector((state) => {
        return {
          token: state.loginReducer.token,
          videos: state.videosReducer.videos,
          categories: state.videosReducer.categories,
        };
      });
  return <div className="videoDetails">
      <h1>VideoDetails</h1>
      </div>;
};

export default VideoDetails;
