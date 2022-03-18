/** @format */

// /** @format */
import React, { useState, useEffect } from "react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addVideo } from "../../reducer/video/index";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

//===============================================================

const AddVideo = () => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
      categories: state.videosReducer.categories,
    };
  });
  const navigate = useNavigate();
  const { token, isLoggedIn, categories } = state;

  const dispatch = useDispatch();
  //   title, descriptions,album_id, video, user_id
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [video, setVideo] = useState("");
  const [album_id, setAlbum_id] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [videoURL, setVideoURL] = useState("1");
  const [starterImage, setStarterImage] = useState("");
  const [user_id, setUser_id] = useState(
    parseInt(localStorage.getItem("userID"))
  );
  const [albums, setAlbums] = useState(categories);
  const [options, setOptions] = useState([]);

  //===============================================================

  const uploadVideo = () => {
    const formData = new FormData();

    formData.append("file", video);
    formData.append("upload_preset", "addVideo");
    console.log(formData);
    setVideoURL("")
    axios
      .post(
        `https://api.cloudinary.com/v1_1/omar-alshishani/video/upload/`,
        formData
      )
      .then(async (res) => {
        await setVideoURL(res.data.secure_url);
        console.log(res.data.secure_url);
        createNewItem(res.data.secure_url);
      });
  };

  //===============================================================
  const uploadImage = (url) => {
    const formData = new FormData();

    formData.append("file", url);
    formData.append("upload_preset", "nbngetia");
    axios
      .post(
        `https://api.cloudinary.com/v1_1/omar-alshishani/image/upload/`,
        formData
      )
      .then(async (res) => {
        await setStarterImage(res.data.secure_url);
      });
  };
  //===============================================================
  const getAllAlbums = async () => {
    try {
      const res = await axios.get("http://localhost:5000/album", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setAlbums(res.data.result);
        let array = albums.map((ele, index) => {
          return { value: ele["id"], label: ele["album"] };
        });
        setOptions(array);
        // console.log(array);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(error.response.data.message);
      }
      console.log("Error happened while Get Data, please try again");
    }
  };

  useEffect(() => {
    getAllAlbums();
  }, []);

  //===============================================================
  let day = new Date().toString().slice(4, 15);
  const createNewItem = async (url) => {
    console.log(url);
    try {
      const item = {
        title: title,
        descriptions,
        video: url,
        album_id,
        user_id,
        dateToday: day,
        starterImage,
      };
      const result = await axios.post("http://localhost:5000/video/", item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.success) {
        setStatus(true);
        dispatch(addVideo({ title, descriptions, video, album_id, user_id }));
       setMessage("The item has been created successfully");
        setTitle("");
        setDescriptions("");
      }
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(false);
        console.log(error.response.data.message);
      }
    }
  };

  //===============================================================

  //===============================================================
  return (
    <section className="vh-400">
      {videoURL?
      <div className="container-fluid h-custom d-flex justify-content-center align-items-center">
        <div className="row d-flex justify-content-center align-items-center h-100 p-4 w-75 mt-4 rounded">
          <div className="col-md-8 col-lg-4 col-xl-4 offset-xl-1">
            <div className="form-outline mb-4">
              <input
                className="form-control form-control-lg"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="TITLE"
              />
            </div>
            <div className="form-outline mb-3">
              <textarea
                className="form-control form-control-lg"
                value={descriptions}
                type="text"
                placeholder="DESCRIPTION"
                onChange={(e) => setDescriptions(e.target.value)}
              />
            </div>
            <div className="form-outline mb-3">
              <Select
                onChange={(e) => {
                  setAlbum_id(e.value);
                }}
                options={options}
                placeholder="ALBUM"
              />
            </div>{" "}
            <div className="form-outline mb-1">
              <label htmlFor="form-outline">SELECT VIDEO</label>
            </div>
            <div className="input-group shadow mb-3">
              <input
                type="file"
                change="fileName = $refs.file.files[0].name"
                className="form-control form-control"
                onChange={(e) => {
                  setVideo(e.target.files[0]);
                }}
              />
            </div>
            <div className="form-outline mb-1">
              <label htmlFor="form-outline">SELECT COVER PHOTO</label>
            </div>
            <div className="input-group shadow">
              <input
                type="file"
                change="fileName = $refs.file.files[0].name"
                className="form-control form-control"
                onChange={async (e) => {
                  uploadImage(e.target.files[0]);
                }}
              />
            </div>
            <div className="text-center text-lg-start mt-4 pt-2">
              <button
                onClick={() => {
                  uploadVideo();
                }}
                className="btn btn-primary btn-lg"
                style={{ paddingLeft: "2.5rem", paddingRight: " 2.5rem" }}>
                Create Video
              </button>
              {message?<p>message</p>:null}
            </div>
          </div>
        </div>
      </div>:<h1>Wait A Moment </h1>}
    </section>
  );
};

export default AddVideo;
