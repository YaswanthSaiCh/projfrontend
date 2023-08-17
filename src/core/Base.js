import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "Title",
  description = "Description",
  classes = "text-center p-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container p-0 mt-3">
        <div data-bs-theme="dark" className="jumbotron text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div>
          <div data-bs-theme="dark" className={classes}>
            {children}
          </div>
        </div>
        <footer data-bs-theme="dark" className="footer mt-auto py-3">
          <div className="container-fluid bg-success text-white text-center py-3">
            <h4>If you got any questions, feel free to react out...</h4>
            <button className="btn btn-warning btn-large">Contact us</button>
          </div>
          <div className="container text-center">
            <span className="text-body-secondary">
              An amazing MERN bootcamp 💚
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Base;
