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
  return (
    <div className="videoDetails">
      <h1>VideoDetails</h1>
      <video controls style={{ width: "800px" }}>
        <source src={videoInfo.video} type="video/mp4; codecs=avc1.4d002a" />
      </video>
    </div>
  );
};

export default VideoDetails;
