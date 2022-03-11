/** @format */
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  return (
    <nav className="navbar navbar-expand-md ">
      <div className="container">
        <Link to="/" className="navbar-brand ">WATCH BOX</Link>
        <form className="d-flex justify-content-center col-6">
          <input
            className="form-control "
            type="search"
            placeholder="&#xF607;Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
          &#xF52A;
          </button>
        </form>
        <form className="d-flex justify-content-center">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
            <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/add"
                  >
                  +
                </Link>
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
                  onClick={localStorage.clear()}>
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
