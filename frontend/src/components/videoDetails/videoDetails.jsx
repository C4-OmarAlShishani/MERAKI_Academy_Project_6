/** @format */
import React, { useEffect, useState } from "react";
import "./videoDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setVideoInfo, updateVideoInfo } from "../../reducer/videoInfo/index";
import { setVideos } from "../../reducer/video/index";

import { BiLike, BiDislike } from "react-icons/bi";

import {
  setComments,
  addComment,
  updateComment,
  deleteComment,
} from "../../reducer/comments/index";
import axios from "axios";

const VideoDetails = () => {
  const { videoInfo, token, comments, isLoggedIn, videos } = useSelector(
    (state) => {
      return {
        videoInfo: state.videoInfoReducer.videoInfo,
        comments: state.commentReducer.comments,
        token: state.loginReducer.token,
        isLoggedIn: state.loginReducer.isLoggedIn,
        videos: state.videosReducer.videos,
      };
    }
  );

  const location = useLocation();
  const dispatch = useDispatch();
  let result = parseInt(location.pathname.slice(7));

  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(result);
  const [commenterId, setCommenterId] = useState(
    parseInt(localStorage.getItem("userID"))
  );
  const [message, setMessage] = useState(0);

  const navigate = useNavigate();

  //=============getRandomVideos============================//
  const getAllVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/video", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        dispatch(setVideos(res.data.result));
        setMessage("");
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };
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
        console.log("The item has been created successfully");
        setMessage(3);
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
    getAllVideos();
  }, []);
  // console.log(videoInfo);

  const videoMap = videos.map((item, index) => {
    return (
      <div className="videoCardInDetails">
        <div className="videoBoxInDetails">
          {item.video ? (
            <video
              className="bodyInDetails"
              id={item.id}
              onClick={(e) => {
                getVideoById(e.target.id);
              }}
              style={{ width: "18rem" }}>
              <source src={item.video} type="video/mp4; codecs=avc1.4d002a" />
            </video>
          ) : null}
        </div>
        <div className="descriptionInDetails">
          <div className="userImageInDetails">
            <p>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.firstName}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    // border: "solid 1px",
                  }}
                />
              ) : null}
            </p>
          </div>
          <div className="userInfoInDetails">
            <p>{item.title}</p>
            <p style={{ color: "rgba(0, 0, 0, 0.486)", fontSize: "0.9rem" }}>
              {item.firstName + " " + item.lastName}
            </p>
            <p style={{ color: "rgba(0, 0, 0, 0.486)", fontSize: "0.9rem" }}>
              {item.showVideo} Views . {item.dateToday}{" "}
            </p>
          </div>
        </div>
      </div>
    );
  });


  return (
    <div className="videoDetails">
      <div className="videoInfo">
        <iframe
          allowFullScreen={true}
          src={videoInfo.video}
          width="640px"
          height="360px"
          style={{ fontSize: "1ram" }}></iframe>
        <br />
        <br />
        <h2 style={{ fontSize: "1rem" }}>{videoInfo.title}</h2>
        <div className="info">
          <p>
            {videoInfo.showVideo} views . {videoInfo.dateToday}
          </p>
          <BiLike
            onClick={() => {
              isLoggedIn ? addLike(result) : navigate("/login");
            }}
            style={{ width: "24px", height: "24px" }}
          />
          <h1 style={{ fontSize: "14px" }}>{videoInfo.likes} </h1>
          <BiDislike
            onClick={() => {
              isLoggedIn ? addDisLike(result) : navigate("/login");
            }}
            style={{ width: "24px", height: "24px" }}
          />
          <h1 style={{ fontSize: "14px" }}>{videoInfo.dislike}</h1>

          <p></p>
        </div>
        <li className="userNav">
          <img
            src={videoInfo.image}
            style={{ width: "48px", height: "48px", borderRadius: "50%" }}
          />
          <h4 style={{ fontSize: "14px" }}>
            {videoInfo.firstName} {videoInfo.lastName}
          </h4>
        </li>
        <h2></h2>
        <h2 style={{ fontSize: "14px" }}>{videoInfo.descriptions}</h2>
        {isLoggedIn ? (
          <>
            <img
              src={localStorage.getItem("image")}
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <input
              type="text"
              placeholder="COMMENT"
              onChange={(e) => setComment(e.target.value)}
              onFocus={() => {
                setShow(true);
              }}
            />
            {show ? (
              <>
                <button
                  onClick={() => {
                    addComment();
                    setShow(false);
                  }}>
                  ADD COMMENT
                </button>
                <button
                  onClick={() => {
                    setShow(false);
                  }}>
                  CANCEL
                </button>
              </>
            ) : null}
          </>
        ) : null}
        {comments.map((comment) => {
          return (
            <div className="comment">
              <h5>
                {comment.firstName} {comment.lastName}
              </h5>
              <img
                src={comment.image}
                style={{ width: "50px", height: "50px" }}
              />
              <p>{comment.comment}</p>
            </div>
          );
        })}
      </div>
      <div>{videoMap}</div>  

    </div>
  );
};

export default VideoDetails;
