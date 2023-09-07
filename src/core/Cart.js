import React, { useEffect, useState } from "react";
import Base from "./Base";
import { loadCart } from "./helper/cartHelper";
import Card from "./Card";
import PaymentCheckout from "./PaymentCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  return (
    <Base
      title="Shopping Cart"
      description="Have a look at your cart items"
      classes="container-fluid my-4"
    >
      {products && products.length > 0 && (
        <div className="row text-white text-center container-fluid">
          <div className="col-lg-8 border rounded">
            <div className="row ">
              {products.map((item) => (
                <div className="col-lg-6 col-md-6" key={item?._id}>
                  <Card
                    product={item}
                    AddToCart={false}
                    RemoveFromCart={true}
                    reload={reload}
                    setReload={setReload}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4 mt-5 mt-lg-0 border border-success rounded">
            <PaymentCheckout products={products} />
          </div>
        </div>
      )}
      {(!products || products.length === 0) && (
        <h2 className="text-white text-center">Your Cart Looks Empty!!!</h2>
      )}
    </Base>
  );
};

export default Cart;
