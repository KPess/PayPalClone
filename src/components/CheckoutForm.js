import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import ReactDOM from "react-dom";

toast.configure();

export default function CheckoutForm() {
  const [product] = React.useState({
    name: "Deposit funds",
    price: 64998.67,
    description: "Cool car"
  });

  async function handleToken(token, addresses) {
    const response = await axios.post(
      "/checkout",
      { token, product }
    );
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
        <h3>${product.price}</h3>
      </div>
      <StripeCheckout
        stripeKey="pk_test_2QtpeVuM2hru92q1zHxaZQFK002dx0OCJ1"
        token={handleToken}
        amount={product.price * 100}
        name="Tesla Roadster"
        billingAddress
        shippingAddress
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<CheckoutForm />, rootElement);





// import React, {Component} from 'react';
// import {CardElement, injectStripe} from 'react-stripe-elements';
// import {Button} from 'reactstrap'

// class CheckoutForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {complete: false};
//     this.submit = this.submit.bind(this);
//   }

//   async submit(ev) {
//     let {token} = await this.props.stripe.createToken({name: "Name"});
//     let response = await fetch("/charge", {
//       method: "POST",
//       headers: {"Content-Type": "text/plain"},
//       body: token.id
//     });
  
//     if (response.ok) this.setState({complete: true}) 
//     console.log("Purchase Complete!")
//   }

//   render() {
//       if (this.state.complete) return <h1>Deposit Complete</h1>
//     return (
//       <div className="checkout">
//         <p>Would you like to complete the deposit?</p>
//         <CardElement />
//         <Button onClick={this.submit}>Deposit</Button>
//       </div>
//     );
//   }
// }

// export default injectStripe(CheckoutForm);