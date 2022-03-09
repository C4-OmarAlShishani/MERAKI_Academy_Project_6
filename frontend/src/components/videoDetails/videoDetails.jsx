/** @format */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory,useNavigate } from "react-router-dom";

const VideoDetails = () => {
    let history = useNavigate();

    // function handleClick() {
    //   history.push("/home");
    // }

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
      <h2>{videoInfo.title}</h2>
      <h2>{videoInfo.firstName}</h2>
    </div>
  );
};

export default VideoDetails;
