/** @format */

import "./signup.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import avatar from "../../image/userAvatar.png";

const SignUp = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [done, setDone] = useState(false);

  const uploadImage = () => {
    const formData = new FormData();

    formData.append("file", imageURL);
    formData.append("upload_preset", "nbngetia");
    axios
      .post(
        `https://api.cloudinary.com/v1_1/omar-alshishani/image/upload/`,
        formData
      )
      .then(async (res) => {
        await setImage(res.data.secure_url);
        console.log(image);
        // createUser(res.data.secure_url);
      });
  };

  const createUser = async (url) => {
    if (!firstName || !lastName || !email || !password || !repeatPassword) {
      console.log("please fill in all inputs");
    } else if (repeatPassword === password) {
      await axios
        .post("http://localhost:5000/user", {
          firstName,
          lastName,
          email: email.toLowerCase(),
          image: image,
          password,
          role_id: 2,
        })
        .then((result) => {
          console.log(result.data);
          setFirstName("");
          setLastName("");
          setRepeatPassword("");
          setEmail("");
          setPassword("");
          setImageURL("");
          setDone(true);
          navigate("/login");
        })
        .catch((err) => {
          console.log("The Email already exists");
        });
    } else {
      console.log("The password should be the same in the repeat password");
    }
  };

  return (
    <div className="signUp">
      <div className="group">
        <input
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          value={firstName}
          type="text"
          placeholder="First Name"
        />

        <input
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          value={lastName}
          type="text"
          placeholder="Last Name"
        />

        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          type="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
          placeholder="Password"
        />
        <input
          onChange={(e) => {
            setRepeatPassword(e.target.value);
          }}
          value={repeatPassword}
          type="Password"
          placeholder="Repeat password"
        />
        <input
          type="file"
          onChange={(e) => {
            setImageURL(e.target.files[0]);
          }}
        />
        <button
          onClick={() => {
            uploadImage();
          }}>
          Register
        </button>
      </div>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={createUser}>
                <div className="form-outline mb-4">
                  <input
                    className="form-control form-control-lg"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    value={firstName}
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-outline mb-3">
                  <input
                    className="form-control form-control-lg"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    value={lastName}
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-outline mb-3">
                  <input
                    className="form-control form-control-lg"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="form-outline mb-3">
                  <input
                    className="form-control form-control-lg"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="form-outline mb-3">
                  <input
                    className="form-control form-control-lg"
                    onChange={(e) => {
                      setRepeatPassword(e.target.value);
                    }}
                    value={repeatPassword}
                    type="Password"
                    placeholder="Repeat password"
                  />
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: " 2.5rem" }}>
                    Register
                  </button>
                  <div className="avatar-upload">
                    <div className="avatar-edit">
                      <input
                        type="file"
                        id="imageUpload"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => {
                          setImageURL(e.target.files[0]);
                          uploadImage()
                        }}
                      />
                      <label htmlFor="imageUpload"></label>
                    </div>
                    <div
                      className="avatar-preview"
                      style={{
                        backgroundImage: `url(${image ? image : avatar})`,
                        backgroundSize: "cover",
                      }}>
                      <div id="imagePreview"></div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
//
