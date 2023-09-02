import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isUserAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isUserAuthenticated();
  useEffect(() => {
    preload();
  }, []);

  const preload = () => {
    getAllProducts()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProducts(data.allProducts);
        }
      })
      .catch((error) => console.log(error));
  };

  const deleteAProduct = (productId) => {
    deleteProduct(productId, user._id, token)
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
        title="Products Page"
        description="Manage products here"
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
                Product Name
              </th>
              <th className="fs-4" colSpan="2">
                Product Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((item) => (
                <tr key={item._id} className=" text-center mb-2 ">
                  <td className="">
                    <h5 className="">{item.name}</h5>
                  </td>
                  <td className="">
                    <Link
                      className="btn btn-success rounded"
                      to={`/admin/product/update/${item._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </td>
                  <td className="">
                    <button
                      onClick={() => deleteAProduct(item._id)}
                      className="btn btn-outline-danger rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {products && (
          <div className="my-3 fs-5 text-white text-center">
            Total products count: {products.length}
          </div>
        )}
      </Base>
    </>
  );
};

export default ManageProducts;
