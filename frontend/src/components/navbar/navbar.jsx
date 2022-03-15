/** @format */
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./navbar.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { setVideos, setCategories } from "../../reducer/video/index";
import { logOut } from "../../reducer/login/index";

const NavBar = () => {
  const dispatch = useDispatch();

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
        console.log(res.data.result);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return error.response.data.message;
      }
      console.log("Error happened while Get Data, please try again");
    }
  };
  return (
    <nav className="navbar navbar-expand-md border-bottom">
      <div className="container">
        <Link to="/" className="navbar-brand ">
          WATCH BOX
        </Link>
        <form className="d-flex justify-content-center col-6">
          <input
            className="form-control "
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => {
              getFilteredItems(`%${e.target.value}%`);
            }}
          />
          <button className="btn btn-outline-success" type="submit">
            <AiOutlineSearch />
          </button>
        </form>
        <form className="d-flex justify-content-center">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                {isLoggedIn ? (
                  <Link className="nav-link" to="/add">
                    +
                  </Link>
                ) : null}
              </li>
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
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/"
                  onClick={()=>dispatch(logOut())}>
                  Signout
                </Link>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default NavBar;
