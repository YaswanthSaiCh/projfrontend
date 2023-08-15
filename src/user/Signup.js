import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-start">
          <form>
            <div className="mb-3">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={handleChange("name")}
              />
            </div>
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
                className="btn btn-success"
                onClick={(event) => onSubmit(event)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const Message = () => {
    return (
      <div
        className={`alert  ${success && "alert-success d-inline-flex"} ${
          error && "alert-danger d-inline-flex"
        } align-items-center justify-content-between fade show my-3`}
        role="alert"
      >
        {success && !error && (
          <>
            <div className="mx-3">
              Account created successfully. Please{" "}
              <Link to="/signin" className="alert-link">
                Login here
              </Link>
            </div>
          </>
        )}
        {!success && error && (
          <>
            <div className="mx-3">{error}</div>
          </>
        )}
      </div>
    );
  };

  return (
    <Base title="Sign Up Page" description="A page where user can sign up...">
      {signUpForm()}
      {Message()}
    </Base>
  );
};

export default Signup;
