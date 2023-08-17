/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link, useNavigate } from "react-router-dom";
import { createProduct, getAllCategories } from "./helper/adminapicall";
import { isUserAuthenticated } from "../auth/helper";

const AddProduct = () => {
  const navigate = useNavigate();
  const { user, token } = isUserAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    category: "",
    categories: [],
    loading: false,
    error: false,
    createdProduct: "",
    formData: "",
  });
  const {
    name,
    description,
    price,
    stock,
    category,
    categories,
    loading,
    error,
    createdProduct,
    formData,
  } = values;

  useEffect(() => {
    preload();
  }, []);

  const preload = () => {
    getAllCategories().then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data?.allCategories,
          formData: new FormData(),
        });
      }
    });
  };
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            loading: false,
            error: data.error,
          });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: null,
            stock: "",
            category: "",
            loading: false,
            didRedirect: true,
            createdProduct: data.name,
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
    if (createdProduct) {
      return (
        <div className="alert alert-success" role="alert">
          {createdProduct} successfully created
        </div>
      );
    }
  };

  const createProductForm = () => (
    <form className="px-5 py-2">
      <div className="form-group mb-3">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Product Name"
          value={name}
        />
      </div>
      <div className="form-group mb-3">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group d-flex mb-3 bg-success rounded p-2 text-white">
        <input
          onChange={handleChange("photo")}
          type="file"
          name="photo"
          accept="image"
          placeholder="choose a file"
        />
      </div>
      <div className="row mb-3">
        <div className="col">
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
              value={category}
            >
              <option>Select Category</option>
              {categories &&
                categories?.map((item) => (
                  <option key={item?._id} value={item?._id}>
                    {item?.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
        </div>
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
          "Create Product"
        )}
      </button>
    </form>
  );
  return (
    <Base
      title="Create Product"
      description="Create a new product here"
      classes="container border rounded border-success p-2 text-center"
    >
      <div className="d-flex mb-3">
        <Link className="btn btn-secondary rounded" to="/admin/dashboard">
          Dashboard
        </Link>
      </div>
      {createProductForm()}
      {Message()}
    </Base>
  );
};

export default AddProduct;
