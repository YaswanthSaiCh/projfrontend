import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signout, isUserAuthenticated } from "../auth/helper";
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
  const navigate = useNavigate();
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

        {isUserAuthenticated() && isUserAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              style={currentTab(location, "/user/dashboard")}
              className="nav-link"
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

        {isUserAuthenticated() && isUserAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              style={currentTab(location, "/admin/dashboard")}
              className="nav-link"
              to="/admin/dashboard"
            >
              Admin Dashboard
            </Link>
          </li>
        )}

        {isUserAuthenticated() ? (
          <li className="nav-item">
            <button
              className="nav-link text-danger"
              onClick={() => {
                signout(() => {
                  navigate("/");
                });
              }}
            >
              Sign Out
            </button>
          </li>
        ) : (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </ul>
    </div>
  );
};

export default Menu;
