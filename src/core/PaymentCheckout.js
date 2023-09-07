import React from "react";
import { isUserAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { API } from "../backend";

const PaymentCheckout = ({ products }) => {
  const totalPrice = () => {
    let price = 0;
    products.map((product) => (price = price + product.price));
    return price;
  };

  const makePayment = async () => {
    const stripe = await loadStripe(
      process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
    );

    const response = await fetch(`${API}/stripe-checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products,
      }),
    });

    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  const showPaymentButton = () => {
    return isUserAuthenticated() ? (
      <button className="btn btn-primary rounded" onClick={() => makePayment()}>
        Proceed to payment
      </button>
    ) : (
      <Link className="btn btn-primary rounded" to="/signin">
        Signin
      </Link>
    );
  };

  return (
    <div>
      <h3>Checkout</h3>
      <div>Total Price: {totalPrice()}</div>
      <div>{showPaymentButton()}</div>
    </div>
  );
};

export default PaymentCheckout;
