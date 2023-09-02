import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isUserAuthenticated } from "../auth/helper";
import { deleteCategory, getAllCategories } from "./helper/adminapicall";
import { Link } from "react-router-dom";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const { user, token } = isUserAuthenticated();
  useEffect(() => {
    preload();
  }, []);

  const preload = () => {
    getAllCategories()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategories(data.allCategories);
        }
      })
      .catch((error) => console.log(error));
  };

  const deleteACategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        }
        preload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Base
        title="Manage Categories"
        description="You can manage your categories here"
        classes="container border rounded border-success p-2 text-center mb-3"
      >
        <div className="d-flex mb-3">
          <Link className="btn btn-secondary rounded" to="/admin/dashboard">
            Dashboard
          </Link>
        </div>
        <table className="table table-dark table-striped table-hover border mb-3">
          <thead className="border border-success">
            <tr>
              <th className="fs-4" scope="col">
                Category Name
              </th>
              <th className="fs-4" colSpan="2">
                Category Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((item) => (
                <tr key={item._id} className=" text-center mb-2 ">
                  <td className="">
                    <h5 className="">{item.name}</h5>
                  </td>
                  <td className="">
                    <Link
                      className="btn btn-success rounded"
                      to={`/admin/category/update/${item._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </td>
                  <td className="">
                    <button
                      onClick={() => deleteACategory(item._id)}
                      className="btn btn-outline-danger rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {categories && (
          <div className="my-3 fs-5 text-white text-center">
            Total categories count: {categories.length}
          </div>
        )}
      </Base>
    </>
  );
};

export default ManageCategories;
