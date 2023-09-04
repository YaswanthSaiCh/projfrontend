import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import "../styles.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  const cartItems = JSON.parse(localStorage.getItem("cart"));

  useEffect(() => {
    loadAllProducts();
  }, [reload]);

  const loadAllProducts = () => {
    getProducts()
      .then((data) => {
        if (data?.error) {
          setError(data?.error);
        } else {
          setProducts(data?.allProducts);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Base title="Welcome to T-shirt store" description="">
      <div className="row">
        {products &&
          products.map((item) => (
            <div key={item._id} className="col-lg-4 col-md-6" align="center">
              <Card
                product={item}
                AddToCart={
                  !cartItems?.some((cartItem) => cartItem._id === item._id)
                }
                RemoveFromCart={cartItems?.some(
                  (cartItem) => cartItem._id === item._id
                )}
                reload={reload}
                setReload={setReload}
              />
            </div>
          ))}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
      </div>
    </Base>
  );
};

export default Home;
