/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCategory, updateCategory } from "./helper/adminapicall";
import { isUserAuthenticated } from "../auth/helper";

const UpdateCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { user, token } = isUserAuthenticated();
  const [values, setValues] = useState({
    name: "",
    error: "",
    loading: false,
    updatedCategory: "",
  });
  const { name, loading, error, updatedCategory } = values;
  useEffect(() => {
    preload(categoryId);
  }, []);

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, name: data.name });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    updateCategory(categoryId, user._id, token, name)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({
            ...values,
            error: false,
            loading: false,
            updatedCategory: data?.updatedCategory,
          });
          setTimeout(() => {
            return navigate("/admin/dashboard");
          }, 2000);
        }
      })
      .catch((error) => console.log(error));
  };

  const Message = () => {
    if (error) {
      return (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      );
    }
    if (updatedCategory) {
      return (
        <div className="alert alert-success" role="alert">
          {updatedCategory?.name} successfully updated
        </div>
      );
    }
  };

  const updateCategoryForm = () => (
    <form className="px-5 py-2">
      <div className="form-group mb-3">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Category Name"
          value={name}
        />
      </div>
      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success rounded"
      >
        {loading ? (
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          "Update Category"
        )}
      </button>
    </form>
  );

  return (
    <Base
      title="Update Category"
      description="Update an existing category here"
      classes="container border rounded border-success p-2 text-center"
    >
      <div className="d-flex mb-3">
        <Link className="btn btn-secondary rounded" to="/admin/categories">
          Categories
        </Link>
      </div>
      {updateCategoryForm()}
      {Message()}
    </Base>
  );
};

export default UpdateCategory;
