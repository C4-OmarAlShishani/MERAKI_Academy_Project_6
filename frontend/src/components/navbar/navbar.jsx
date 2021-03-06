/** @format */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./navbar.css";
import { AiOutlineSearch } from "react-icons/ai";
import { RiVideoUploadLine } from "react-icons/ri";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { BiUserPlus, BiUserCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { setVideos, setCategories } from "../../reducer/video/index";
import { logOut } from "../../reducer/login/index";
import { useNavigate } from "react-router-dom";
import youTubeLogo from "../../image/YouTube_Logo.svg.webp";

const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, token } = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
  const getFilteredItems = async (value) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/video/filter",
        { value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(setVideos(res.data.result));
        navigate("/");
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return error.response.data.message;
      }
      console.log("Error happened while Get Data, please try again");
    }
  };
  return (
    <div className="navBar">
      <Link to="/">
        <img src={youTubeLogo} width="100px" height="25px"></img>
      </Link>
      <div className="search">
        <input
          className="form-control "
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => {
            setSearchValue(`%${e.target.value}%`);
          }}
        />
        <button
          className="searchBtn"
          onClick={() => getFilteredItems(searchValue)}>
          <AiOutlineSearch style={{ width: "20px", height: "20px" }} />
        </button>
      </div>
      <div className="list">
        <ul className="list">
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/add">
                  <RiVideoUploadLine
                    style={{ width: "25px", height: "25px" }}
                  />
                </Link>
              </li>
              <li className="userNav">
                <img
                  src={localStorage.getItem("image")}
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
                {/* <h5>{localStorage.getItem("userName")}</h5> */}
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/"
                  onClick={() => {
                    dispatch(logOut());
                    localStorage.clear();
                  }}>
                  <FaSignOutAlt style={{ width: "25px", height: "25px" }} />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/login"
                  style={{
                    border: "solid 1px",
                    borderRadius: "2px",
                    padding: "2px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}>
                  <h1 style={{ fontSize: "1rem" }}>
                    <BiUserCircle style={{ width: "25px", height: "25px" }} />{" "}
                    SIGN IN
                  </h1>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
