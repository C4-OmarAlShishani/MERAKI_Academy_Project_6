/** @format */

import axios from "axios";
import { Link } from "react-router-dom";
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
          localStorage.setItem("image", jwt(result.data.token).image);
          localStorage.setItem("userID", jwt(result.data.token).userId);
          setEmail("");
          setPassword("");
          if (jwt(result.data.token).role == 1) {
            localStorage.setItem("isAdmin", true);
            navigate(`/`);
          } else {
            navigate(`/`);
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
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-1 col-xl-4 offset-xl-1">
              <form onSubmit={verifyUser}>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                </div>
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" />
                    <label className="form-check-label">Remember me</label>
                  </div>
                  <a href="#!" className="text-body">
                    Forgot password?
                  </a>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: " 2.5rem" }}>
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <Link className="link-danger" to="/singUp">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
