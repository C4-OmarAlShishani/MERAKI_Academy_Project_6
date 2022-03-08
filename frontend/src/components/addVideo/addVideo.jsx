/** @format */

// /** @format */
import React, { useState, useEffect } from "react";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addVideo } from "../../reducer/video/index";

//===============================================================

const AddVideo = () => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const { token, isLoggedIn } = state;

  const dispatch = useDispatch();
  //   title, descriptions,album_id, video, user_id
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [video, setVideo] = useState("");
  const [album_id, setAlbum_id] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [user_id, setUser_id] = useState(
    parseInt(localStorage.getItem("userID"))
  );

  //===============================================================

  const uploadImage = () => {
    const formData = new FormData();

    formData.append("file", video);
    formData.append("upload_preset", "rwnvwutb");
    axios
      .post(`https://api.cloudinary.com/v1_1/debtpixx1/image/upload/`, formData)
      .then((res) => {
        setVideoURL(res.data.secure_url);
        console.log(res.data.secure_url);
      });
  };

  //===============================================================

  const createNewItem = async (e) => {
    e.preventDefault();

    try {
      const item = {
        title: title,
        descriptions: "in stock",
        video: videoURL,
        album_id,
        user_id,
      };
      const result = await axios.post("http://localhost:5000/item/", item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.success) {
        setStatus(true);
        dispatch(addVideo({ title, descriptions, video, album_id, user_id }));
        setMessage("The item has been created successfully");
      }
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    }
  };

  //===============================================================
  return (
    <div className="addItemAdmin">
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
      <input
        placeholder="ALBUM"
        onChange={(e) => setAlbum_id(e.target.value)}
      />
      <datalist id="data">
        <option id={1} value={"Music"} />
        <option id={2} value={"Favorite"} />
      </datalist>
      <br />

      <input
        type="file"
        onChange={(e) => {
          setVideo(e.target.files[0]);
        }}
      />
      <div className="addItemBTN">
        {/* <button onClick={uploadImage}> upload image</button> */}
        <button
          onClick={() => {
            uploadImage();
            createNewItem();
          }}>
          Create New item
        </button>
        <br />
        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
      </div>
    </div>
  );
};

export default AddVideo;
