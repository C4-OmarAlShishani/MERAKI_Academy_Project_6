/** @format */

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { logIn, isAdmin } from "../../reducer/login/index";
import jwt from "jwt-decode";

import { useDispatch } from "react-redux";

const Login = (message) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const verifyUser = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:5000/login", {
        email: email.toLowerCase(),
        password,
      })
      .then((result) => {
        if (result) {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("userName", jwt(result.data.token).userName);
          localStorage.setItem("userID", jwt(result.data.token).userId);
          setEmail("");
          setPassword("");
          if (jwt(result.data.token).role == 1) {
            localStorage.setItem("isAdmin", true);
            navigate(`/add`);
          } else {
            navigate(`/add`);
          }
          dispatch(logIn(result.data.token));
        }
      })
      .catch((err) => {
        console.log("Error happened while Login, please try again");
      });
  };

  return (
    <>
      <div className="login_box">
        <form onSubmit={verifyUser}>
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
          <button>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
