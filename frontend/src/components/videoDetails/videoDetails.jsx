/** @format */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setVideoInfo, updateVideoInfo } from "../../reducer/videoInfo/index";
import { BiLike, BiDislike } from "react-icons/bi";

import {
  setComments,
  addComment,
  updateComment,
  deleteComment,
} from "../../reducer/comments/index";
import axios from "axios";

const VideoDetails = () => {
  const { videoInfo, token, comments, isLoggedIn } = useSelector((state) => {
    return {
      videoInfo: state.videoInfoReducer.videoInfo,
      comments: state.commentReducer.comments,
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const location = useLocation();
  const dispatch = useDispatch();
  let result = parseInt(location.pathname.slice(7));

  const [comment, setComment] = useState("");
  const [videoId, setVideoId] = useState(result);
  const [commenterId, setCommenterId] = useState(
    parseInt(localStorage.getItem("userID"))
  );
  const [message, setMessage] = useState(0);

  const navigate = useNavigate();

  //=============getVideoById============================//
  const getVideoById = async (id) => {
    await axios
      .get(`http://localhost:5000/video/id?id=${id}`)
      .then(async (result) => {
        await dispatch(setVideoInfo({ ...result.data.result }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //=============view============================//
  const views = async (id) => {
    await axios
      .put(`http://localhost:5000/video/${id}`)
      .then(async (result) => {
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //=============getAllComments============================//
  const getAllComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/comment/vid?id=${result}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
  const addComment = async () => {
    try {
      const addComment = {
        comment,
        video_id: videoId,
        commentr_id: 1,
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
        setMessage(2);
        console.log("The item has been created successfully");
      }
    } catch (error) {
      if (!error.response.data.success) {
        console.log(error.response.data.message);
      }
    }
  };

  //=============addLike============================//

  const addLike = async (id) => {
    await axios
      .put(`http://localhost:5000/video/like/${id}`)
      .then(async (result) => {
        setMessage(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //=============addLike============================//

  const addDisLike = async (id) => {
    await axios
      .put(`http://localhost:5000/video/dislike/${id}`)
      .then(async (result) => {
        setMessage(2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getVideoById(result);
    getAllComments();
  }, [message]);

  useEffect(() => {
    views(result);
  }, []);
  // console.log(videoInfo);
  return (
    <div className="videoDetails">
      <h1>VideoDetails</h1>
      {/* <video controls style={{ width: "800px" }}>
        <source src={videoInfo.video} type="video/mp4; codecs=avc1.4d002a" />
      </video> */}
      <iframe
        allowFullScreen={true}
        src={videoInfo.video}
        width="800px"
        height="450px"></iframe>
      <h2>{videoInfo.title}</h2>
      <h2>
        {videoInfo.firstName} {videoInfo.lastName}
      </h2>
      <h2>{videoInfo.descriptions}</h2>
      <BiLike
        onClick={() => {
          isLoggedIn ? addLike(result) : navigate("/login");
        }}
        style={{ width: "50px", height: "50px" }}
      />
      {videoInfo.likes}
      <BiDislike
        onClick={() => {
          isLoggedIn ? addDisLike(result) : navigate("/login");
        }}
        style={{ width: "50px", height: "50px" }}
      />
      {videoInfo.dislike}
      <br />
      {videoInfo.showVideo}
      <br />
      {videoInfo.dateToday}
      {isLoggedIn ? (
        <>
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
        </>
      ) : null}
      {comments.map((comment) => {
        return (
          <div className="comment">
            <h5>
              {comment.firstName} {comment.lastName}
            </h5>
            <img src={comment.image} style={{width:"50px", height:"50px" }}/>
            <p>{comment.comment}</p>
          </div>
        );
      })}
    </div>
  );
};

export default VideoDetails;
