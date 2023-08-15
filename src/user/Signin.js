import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const Signin = () => {
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-start">
          <form>
            <div className="mb-3">
              <label className="text-light">Email</label>
              <input className="form-control" type="text" />
            </div>
            <div className="mb-3">
              <label className="text-light">Password</label>
              <input className="form-control" type="password" />
            </div>
            <div className="d-grid">
              <button type="button" className="btn btn-success">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Base title="Sign In Page" description="A page where user can sign in...">
        {signInForm()}
      </Base>
    </div>
  );
};

export default Signin;
