/** @format */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setVideoInfo } from "../../reducer/videoInfo/index";
import axios from "axios";

const VideoDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  let result = parseInt(location.pathname.slice(7));

  const { videoInfo } = useSelector((state) => {
    return {
      videoInfo: state.videoInfoReducer.videoInfo,
    };
  });

  const getVideoById = async (id) => {
    await axios
      .get(`http://localhost:5000/video/id?id=${id}`)
      .then(async (result) => {
        await dispatch(setVideoInfo({ ...result.data.result }));
        console.log(...result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getVideoById(result);
  }, []);

  return (
    <div className="videoDetails">
      <h1>VideoDetails</h1>
      <video controls style={{ width: "800px" }}>
        <source src={videoInfo.video} type="video/mp4; codecs=avc1.4d002a" />
      </video>
      <h2>{videoInfo.title}</h2>
      <h2>
        {videoInfo.firstName} {videoInfo.lastName}
      </h2>
    </div>
  );
};

export default VideoDetails;
