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
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand">Navbar</a>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
          <button
            className="btn btn-outline-success"
            onClick={localStorage.clear()}>
            Signout
          </button>

          <>
            <Link to="/singUp">Singup</Link>
            <Link to="/login">login</Link>
          </>
        </form>
      </div>
    </nav>
  );
};

export default NavBar;
