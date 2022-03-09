/** @format */

import React, { useEffect, useState } from "react";

import "./mainPage.css";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setVideos, setCategories } from "../../reducer/video/index";
import { setVideoInfo } from "../../reducer/videoInfo/index";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

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
  const [categoryId, setCategoryId] = useState(1);

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
  }, []);
  //===============================================================
  const getVideoById = async (id) => {
    await axios
      .get(`http://localhost:5000/video/id?id=${id}`)
      .then((result) => {
        dispatch(setVideoInfo({ ...result.data.result }));
        console.log(...result.data.result);
        navigate(`/watch/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //===============================================================

  //   let categoriesMap = categories.map((category, indx) => {
  //     return (
  //       <>
  //         <li
  //           id={category.id}
  //           onClick={(e) => {
  //             setCategoryId(parseInt(e.target.id));
  //           }}>
  //           {category.category}
  //         </li>
  //       </>
  //     );
  //   });

  return (
    <div className="mainPage">
      <div className="videos">
        <h1>Hallo Main</h1>
        {videos.map((item, index) => {
          return (
            <div className="container ">
              <div className="videoBox">
                {item.video ? (
                  <video
                    id={item.id}
                    onClick={(e) => {
                      console.log(item);
                      console.log(e.target.id);
                      getVideoById(e.target.id);
                    }}
                    style={{ width: "400px" }}>
                    <source
                      src={item.video}
                      type="video/mp4; codecs=avc1.4d002a"
                    />
                  </video>
                ) : null}
              </div>
              <div className="title">
                <p>{item.title}</p>
              </div>
              <div className="userInfo">
                <p>
                  {item.image ? (
                    <img src={item.image} alt={item.firstName} />
                  ) : null}
                  {item.firstName + " " + item.lastName}
                </p>
              </div>
              <div className="btn">
                {/* <button
                  id={item.id}
                  onClick={(e) => {
                    console.log(item);
                    console.log(e.target.id);
                    getVideoById(e.target.id);
                  }}>
                  ITEM DETAILS
                </button> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
//  <div class="card" style="width: 18rem;">
// <video src={item.video}></video>
// <div class="card-body">
//   <h5 class="card-title">{item.title}</h5>
//   <p class="card-text"></p>
//   <a href="#" class="btn btn-primary">Go somewhere</a>
// </div>
// </div>

export default MainPage;
