/** @format */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./navbar.css";
import { AiOutlineSearch } from "react-icons/ai";
import { RiVideoUploadLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { setVideos, setCategories } from "../../reducer/video/index";
import { logOut } from "../../reducer/login/index";
import { useNavigate } from "react-router-dom";

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
        <Link to="/" >
          WATCH BOX
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
            <AiOutlineSearch />
          </button>
        </div>
          <div className="list">
            <ul className="list">
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/add">
                      <RiVideoUploadLine />
                    </Link>
                  </li>
                  <li>
                    <img src={localStorage.getItem("image")}  style={{ width: "40px", height: "40px", borderRadius: "50%" }}/>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/"
                      onClick={() => dispatch(logOut())}>
                      Signout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/singUp">
                      Singup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      login
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
