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
    };
  });
  const navigate = useNavigate();
  const { token, isLoggedIn } = state;
  isLoggedIn ? null : navigate("/login");

  const dispatch = useDispatch();
  //   title, descriptions,album_id, video, user_id
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [video, setVideo] = useState("");
  const [album_id, setAlbum_id] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [starterImage, setStarterImage] = useState("");
  const [user_id, setUser_id] = useState(
    parseInt(localStorage.getItem("userID"))
  );
  const options = [
    { value: 1, label: "Music" },
    { value: 2, label: "Favorite" },
  ];
  //===============================================================

  const uploadImage = () => {
    const formData = new FormData();

    formData.append("file", video);
    formData.append("upload_preset", "addVideo");
    console.log(formData);
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

  const createNewItem = async (url) => {
    console.log(url);
    try {
      const item = {
        title: title,
        descriptions,
        video: url,
        album_id,
        user_id,
      };
      const result = await axios.post("http://localhost:5000/video/", item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.success) {
        setStatus(true);
        dispatch(addVideo({ title, descriptions, video, album_id, user_id }));
        console.log("The item has been created successfully");
      }
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(false);
        console.log(error.response.data.message);
      }
    }
  };

  //===============================================================
  return (
    <div className="addItemAdmin">
      {isLoggedIn ? (
        <>
          <h2>NEW ITEM</h2>
          <br />
          <input
            type="text"
            placeholder="TITLE"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />
          <textarea
            type="text"
            placeholder="Description"
            onChange={(e) => setDescriptions(e.target.value)}
          />
          <br />
          <br />
          <Select
            onChange={(e) => {
              setAlbum_id(e.value);
            }}
            options={options}
            placeholder="ALBUM"
          />

          <input
            type="file"
            onChange={(e) => {
              setVideo(e.target.files[0]);
            }}
          />
          <div className="addItemBTN">
            <button
              onClick={() => {
                uploadImage();
              }}>
              Create New item
            </button>
            <br />
            {status
              ? message && <div className="SuccessMessage">{message}</div>
              : message && <div className="ErrorMessage">{message}</div>}
          </div>
        </>
      ) : (
        navigate("/login")
      )}
    </div>
  );
};

export default AddVideo;
