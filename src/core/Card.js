import React from "react";
import { API } from "../backend";

const Card = ({ product, AddToCart = true, RemoveFromCart = false }) => {
  const imageURL = product
    ? `${API}/product/photo/${product._id}`
    : "https://images.freecreatives.com/wp-content/uploads/2015/03/Huge-Backgrounds-63.jpg";

  const showAddtoCart = (AddToCart) => {
    return (
      AddToCart && (
        <button className="btn btn-success rounded mb-3" onClick={() => {}}>
          Add to Cart
        </button>
      )
    );
  };
  const showRemovetoCart = (RemoveFromCart) => {
    return (
      RemoveFromCart && (
        <button className="btn btn-outline-danger rounded" onClick={() => {}}>
          Remove from Cart
        </button>
      )
    );
  };
  return (
    <div className="card border-success mb-3" style={{ width: "18rem" }}>
      <div className="" style={{ maxHeight: "12rem", backgroundSize: "cover" }}>
        <img
          src={imageURL}
          className="card-img-top"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
          alt="..."
        />
      </div>

      <div className="card-body">
        <h5 className="card-title">{product?.name || "product name"}</h5>
        <p className="card-text">
          {product?.description || "product description"}
        </p>
      </div>
      <div className="card-footer d-flex flex-column">
        <div className="card-title d-flex justify-content-between">
          <h5>Price</h5>
          <h5>Rs {product?.price || "price"}</h5>
        </div>
        {showAddtoCart(AddToCart)}
        {showRemovetoCart(RemoveFromCart)}
      </div>
    </div>
  );
};

export default Card;
