import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../menu.css";

const currentTab = (location, path) => {
  if (location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#818181" };
  }
};
const Menu = () => {
  const location = useLocation();

  return (
    <div>
      <ul data-bs-theme="dark" className="nav nav-tabs">
        <li className="nav-item">
          <Link style={currentTab(location, "/")} className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(location, "/cart")}
            className="nav-link"
            to="/cart"
          >
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(location, "/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(location, "/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            Admin Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(location, "/signup")}
            className="nav-link"
            to="/signup"
          >
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(location, "/signin")}
            className="nav-link"
            to="/signin"
          >
            Sign In
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(location, "/signout")}
            className="nav-link"
            to="/signout"
          >
            Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
