import React, { useState } from "react";
import Base from "../core/Base";
import { Navigate } from "react-router-dom";
import { signin, authenticateUser, isUserAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "johnny@example.com",
    password: "Johnny@123",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isUserAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticateUser(data, () =>
            setValues({
              ...values,
              didRedirect: true,
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/user/dashboard" />;
      }
    }
    if (isUserAuthenticated()) {
      return <Navigate to="/" />;
    }
  };

  const loader = () => {
    return (
      loading && (
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div
        className={`alert ${
          error ? "alert-danger d-inline-flex" : "d-none"
        } align-items-center justify-content-between fade show my-3`}
        role="alert"
      >
        {error}
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-start">
          <form>
            <div className="mb-3">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                type="text"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div className="mb-3">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={handleChange("password")}
              />
            </div>
            <div className="d-grid">
              <button
                type="button"
                className="btn btn-success"
                onClick={onSubmit}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In Page" description="A page where user can sign in...">
      {signInForm()}
      {loader()}
      {errorMessage()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
