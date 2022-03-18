/** @format */

import React, { useEffect, useState } from "react";

import "./mainPage.css";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setVideos, setCategories } from "../../reducer/video/index";
import { setVideoInfo } from "../../reducer/videoInfo/index";
import { useNavigate } from "react-router-dom";
import PaginateReact from "react-paginate";

//===============================================================

const MainPage = () => {
  // ---------------------------------------------
  const { categories, token, videos } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      videos: state.videosReducer.videos,
      categories: state.videosReducer.categories,
    };
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // ---------------------------------------------
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [pgNum, setPgNum] = useState(0);

  //===============================================================

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
        setUserId(res.data.userId);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  //===============================================================

  const getAllCategories = async () => {
    if(categoryId===0){
    try {
      const res = await axios.get("http://localhost:5000/album", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        dispatch(setCategories(res.data.result));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }}else{
      
    }
  };

  //===============================================================

  useEffect(() => {
    getAllVideos();
    getAllCategories();
    return dispatch(setVideos([]));
  }, []);

  //===============================================================
  const getVideoById = async (id) => {
    await axios
      .get(`http://localhost:5000/video/id?id=${id}`)
      .then((result) => {
        dispatch(setVideoInfo({ ...result.data.result }));
        navigate(`/watch/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //===============================================================

  //===============================================================

  const itemsPerPg = 12;
  const pgVS = pgNum * itemsPerPg;
  const pageCount = Math.ceil(videos.length / itemsPerPg);
  const changePage = ({ selected }) => {
    setPgNum(selected);
  };
  const videoMap = videos.slice(pgVS, pgVS + itemsPerPg).map((item, index) => {
    return (
      <div key={index} className="videoCard">
        <div className="videoBox">
          {item.starterImage ? (
            <img
              id={item.id}
              src={item.starterImage}
              style={{ width: "18rem" }}
              onClick={(e) => {
                getVideoById(e.target.id);
              }}
            />
          ) : item.video ? (
            <video
              className="body"
              id={item.id}
              onClick={(e) => {
                getVideoById(e.target.id);
              }}
              style={{ width: "18rem" }}>
              <source src={item.video} type="video/mp4; codecs=avc1.4d002a" />
            </video>
          ) : null}
        </div>
        <div className="description">
          <div className="userImage">
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
          <div className="userInfo">
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
  let backColor = { backgroundColor: "black" };
  return (
    <div className="mainPage">
      <div className="albums">
        <ul>
          <li id="0" onClick={(e) => setCategories(e.target.id)}>
            All
          </li>
          {categories.map((ele, index) => {
            return (
              <li
                key={index}
                id={ele.id}
                style={categoryId === ele.id ? backColor : null}
                onClick={(e) => setCategories(e.target.id)}>
                {ele.album}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="cardsGroup">{videoMap}</div>
      <div>
        <PaginateReact
          PreviousLabel={"Previous"}
          NextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination_box"}
          disabledClassName={" paginationDisabled "}
          activeClassName={" paginationActive "}
        />
      </div>
    </div>
  );
};

export default MainPage;
