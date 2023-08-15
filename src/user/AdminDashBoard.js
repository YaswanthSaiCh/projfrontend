import React from "react";
import Base from "../core/Base";
import { isUserAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isUserAuthenticated();
  const adminLeftPane = () => {
    return (
      <div className="d-flex flex-column px-3 text-white">
        <h2>Admin Menu</h2>
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <Link
              className="nav-link align-middle px-0"
              to="/admin/create/category"
            >
              Create categories
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link align-middle px-0"
              to="/admin/create/product"
            >
              Create product
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link align-middle px-0" to="/admin/products">
              Manage products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link align-middle px-0" to="/admin/orders">
              Manages orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminRightPane = () => {
    return (
      <div className="card">
        <h2 className="card-header py-3">Admin Information</h2>
        <ul className="list-group list-group-flush">
          <div className="list-group-item">
            <span className="badge text-bg-success">Name</span>
            <span className="mx-3 text-uppercase">{name}</span>
          </div>
          <div className="list-group-item">
            <span className="badge text-bg-success">Email</span>
            <span className="mx-3">{email}</span>
          </div>
          <div className="list-group-item">
            <span className="badge text-bg-danger">Admin Area</span>
          </div>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Admin Dashboard"
      description="Manage all the products here"
      classes="container"
    >
      <div className="row flex">
        <div className="col-auto py-3 border rounded border-success">
          {adminLeftPane()}
        </div>
        <div className="col">{adminRightPane()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
