import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder } from "./helper/orderHelper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { isUserAuthenticated } from "../auth/helper";
import Confetti from "react-confetti";
import { Player } from "@lottiefiles/react-lottie-player";
import Base from "./Base";

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
  products?.length > 0 &&
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
        }, 5000);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
      });

  return (
    <Base className="h-100 d-flex" title="" description="">
      {typeof window !== "undefined" && (
        <Confetti width={window.screen.width} height={window.screen.height} />
      )}
      <Player
        src="https://lottie.host/b0e5076f-713f-45df-956a-e53faf16ab86/x4xf1Qx87z.json"
        className="player"
        loop
        autoplay
        style={{ height: "300px", width: "300px" }}
      />
      <h1 className="m-auto text-white">Order Placed Successfully</h1>
    </Base>
  );
};

export default Success;
