import React from "react";
import Base from "./Base";
import "../styles.css";

const Home = () => {
  return (
    <Base title="Home Page" description="Welcome to T-shirt store">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
      </div>
    </Base>
  );
};

export default Home;
