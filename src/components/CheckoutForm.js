import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom";
import burning from "../burning.gif"

toast.configure();

export default function CheckoutForm() {
  const [product] = React.useState({
    name: "Donate today!",
    price: 100.0,
    description: "Donate"
  });

  async function handleToken(token, addresses) {
    const response = await axios.post("/checkout", { token, product });
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div className="container">
      <div className="product">
        <h1>{product.name}</h1>
        <div><img src={burning} alt="burning money"/></div>
      <h3>${product.price}</h3>
      </div>
      <StripeCheckout
        stripeKey="pk_test_2QtpeVuM2hru92q1zHxaZQFK002dx0OCJ1"
        token={handleToken}
        amount={product.price * 100}
        name="Deposit"
        billingAddress
        shippingAddress
        />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<CheckoutForm />, rootElement);
