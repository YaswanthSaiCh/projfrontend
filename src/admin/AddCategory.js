import React, { useState } from "react";
import Base from "../core/Base";
import { isUserAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isUserAuthenticated();

  const gotoAdminDash = () => {
    return (
      <div className="d-flex mb-3">
        <Link className="btn btn-secondary rounded" to="/admin/dashboard">
          Dashboard
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const Message = () => {
    if (error) {
      return (
        <div className="alert alert-danger" role="alert">
          Error creating a Category
        </div>
      );
    }
    if (success) {
      return (
        <div className="alert alert-success" role="alert">
          Category successfully created
        </div>
      );
    }
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="d-flex align-items-center justify-content-center">
          <div className="form-group w-50 ">
            <input
              className="form-control my-3"
              placeholder="Enter a Category"
              type="text"
              autoFocus
              required
              value={name}
              onChange={handleChange}
            />
            <button
              className="btn btn-outline-success rounded my-3"
              onClick={onSubmit}
            >
              Create Category
            </button>
          </div>
        </div>
      </form>
    );
  };
  return (
    <Base
      title="Create a category"
      description="Add a new category for the products"
    >
      <div className="container border rounded border-success p-3">
        {gotoAdminDash()}
        {categoryForm()}
        {Message()}
      </div>
    </Base>
  );
};

export default AddCategory;
