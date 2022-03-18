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

      <section className="vh-400">
      <div className="container-fluid h-custom d-flex justify-content-center align-items-center">
        <div className="row d-flex justify-content-center align-items-center h-100 p-4 w-75 mt-4 rounded">
          <div className="col-md-8 col-lg-4 col-xl-4 offset-xl-1">
            {/* <form onSubmit={createUser}> */}
            <div className="form-outline mb-4">
              <input
                className="form-control form-control-lg"
                onChange={(e) => {
                  // setFirstName(e.target.value);
                }}
                // value={firstName}
                type="text"
                placeholder="First Name"
              />
            </div>
            <div className="form-outline mb-3">
              <input
                className="form-control form-control-lg"
                onChange={(e) => {
                  // setLastName(e.target.value);
                }}
                // value={lastName}
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div className="form-outline mb-3">
              <input
                className="form-control form-control-lg"
                onChange={(e) => {
                  // setEmail(e.target.value);
                }}
                // value={email}
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="form-outline mb-3">
              <input
                className="form-control form-control-lg"
                onChange={(e) => {
                  // setPassword(e.target.value);
                }}
                // value={password}
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="form-outline mb-3">
              <input
                className="form-control form-control-lg"
                onChange={(e) => {
                  // setRepeatPassword(e.target.value);
                }}
                // value={repeatPassword}
                type="Password"
                placeholder="Repeat password"
              />
            </div>
            <div className="text-center text-lg-start mt-4 pt-2">
              <button
                // type="submit"
                // onClick={() => createUser()}
                className="btn btn-primary btn-lg"
                style={{ paddingLeft: "2.5rem", paddingRight: " 2.5rem" }}>
                Register
              </button>
            </div>
          </div>
          <div className="avatar-upload">
            <div className="avatar-edit">
              <input
                type="file"
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
                onChange={async (e) => {
                  // uploadImage(e.target.files[0]);
                }}
              />
              <label htmlFor="imageUpload"></label>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    </section>

    </div>
  );
};

export default AddVideo;
