import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder } from "./helper/orderHelper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { isUserAuthenticated } from "../auth/helper";

const Success = () => {
  const { session_id } = useParams();
  const navigate = useNavigate();
  const userId = isUserAuthenticated() && isUserAuthenticated().user._id;
  const token = isUserAuthenticated() && isUserAuthenticated().token;

  const [products, setProducts] = useState([]);
  useEffect(() => {
    session_id && setProducts(loadCart());
  }, [session_id]);

  let price = 0;
  products?.map((product) => (price = price + product.price));
  const order = {
    products: products,
    transaction_id: session_id,
    amount: price,
  };
  products.length > 0 &&
    createOrder(userId, token, order)
      .then((response) => {
        if (response.error) {
          console.log(response.error);
        }
        cartEmpty(() => {
          console.log("Did we got a crash?");
        });
        setTimeout(() => {
          return navigate("/");
        }, 2000);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
      });

  return <div className="text-white text-center">Success</div>;
};

export default Success;
