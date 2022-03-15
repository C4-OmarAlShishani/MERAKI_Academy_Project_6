/** @format */

import "./signup.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [done, setDone] = useState(false);

  const uploadImage = () => {
      const formData = new FormData();

      formData.append("file", imageURL);
      formData.append("upload_preset", "nbngetia");
      axios
        .post(`https://api.cloudinary.com/v1_1/omar-alshishani/image/upload/`, formData)
        .then(async(res) => {
          // await setImageURL(res.data.secure_url);
          createUser(res.data.secure_url);
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
          image: url,
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
    </div>
  );
};

export default SignUp;
//
