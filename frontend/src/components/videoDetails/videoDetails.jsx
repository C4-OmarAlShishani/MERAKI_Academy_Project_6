/** @format */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setVideoInfo,
  setComments,
  addComment,
  updateComment,
  deleteComment,
} from "../../reducer/videoInfo/index";
import axios from "axios";

const VideoDetails = () => {
  const { videoInfo, token, comments } = useSelector((state) => {
    return {
      videoInfo: state.videoInfoReducer.videoInfo,
      comments: state.videoInfoReducer.comments,
      token: state.loginReducer.token,
    };
  });
console.log(comments);
const [comment, setComment] = useState("");
const [videoId, setVideoId] = useState(videoInfo.id);
const [commenterId, setCommenterId] = useState(
  parseInt(localStorage.getItem("userID"))
  );
  console.log(localStorage.getItem("token"));
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  let result = parseInt(location.pathname.slice(7));
  
  //=============getVideoById============================//
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

  //=============getAllComments============================//
  const getAllComments = async (id) => {
    try {
      const res = await axios.get("http://localhost:5000/comment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        dispatch(setComments(res.data.result));
        setMessage("");
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  //=============addComment============================//
  const addComment = async (id) => {
    try {
      const addComment = {
        comment,
        video_id: videoId,
        commentr_id: commenterId,
      };
      console.log(addComment);
      const result = await axios.post(
        "http://localhost:5000/comment/",
        addComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        dispatch(
          addComment({ comment, video_id: videoId, commentr_id: commenterId })
        );
        console.log("The item has been created successfully");
      }
    } catch (error) {
      if (!error.response.data.success) {
        console.log(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getVideoById(result);
    getAllComments();
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
      <h2>{videoInfo.descriptions}</h2>
      <input
        type="text"
        placeholder="COMMENT"
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={() => {
          addComment();
        }}>
        ADD COMMENT
      </button>
    </div>
  );
};

export default VideoDetails;
