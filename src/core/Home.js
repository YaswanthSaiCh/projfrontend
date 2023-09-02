import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import "../styles.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

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
              <Card product={item} />
            </div>
          ))}
      </div>
    </Base>
  );
};

export default Home;
