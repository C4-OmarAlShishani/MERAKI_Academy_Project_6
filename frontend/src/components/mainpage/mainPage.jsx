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
  console.log(token);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // ---------------------------------------------
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [categoryId, setCategoryId] = useState(1);
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

  //   const getAllCategories = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5000/category", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (res.data.success) {
  //         dispatch(setCategories(res.data.result));
  //       } else throw Error;
  //     } catch (error) {
  //       if (!error.response.data.success) {
  //         return setMessage(error.response.data.message);
  //       }
  //       setMessage("Error happened while Get Data, please try again");
  //     }
  //   };
  //===============================================================

  useEffect(() => {
    getAllVideos();
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

  const itemsPerPg = 4;
  const pgVS = pgNum * itemsPerPg;
  const pageCount = Math.ceil(videos.length / itemsPerPg);
  const changePage = ({ selected }) => {
    setPgNum(selected);
  };
  const videoMap = videos.slice(pgVS, pgVS + itemsPerPg).map((item, index) => {
    return (
    
        <div className="videoCard">
          <div className="videoBox">
            {item.video ? (
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
          <div className="title">
            <p>{item.title}</p>
          </div>
          <div className="userInfo">
            <p>
              {item.image ? (
                <img src={item.image} alt={item.firstName} style={{width:"50px", height:"50px" }}/>
              ) : null}
              {item.firstName + " " + item.lastName}
            </p>
          </div>
          <div className="btn"></div>
        </div>
    );
  });

  return (
    <div className="mainPage">
      
        <div className="cardsGroup">
          {videoMap}
        </div>
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
  );
};

export default MainPage;
