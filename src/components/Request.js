//Request money from admin.
//Nodemailer will email admin

import HeaderNav from "./Nav";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setBalance } from "../redux/reducer";
import React from "react";
import axios from "axios";

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipEmail: "",
      senderEmail: "",
      senderPassword: "",
      requestAmount: ""
    };
  }
  resetForm() {
    document.getElementById("contact-form").reset();
  }
  handleSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    axios.post('/send', {
      name: name,
      email: email,
      message: message
    }).then(response => {
      if (response.data.msg === "success") {
        alert("Message Sent.");
        this.resetForm();
      } else if (response.data.msg === "fail") {
        alert("Message failed to send.");
      }
    });
  }
  render() {
    const {user} = this.props
        if (!user.username) {
          return <Redirect to="/" />;
        }
    return (
      <div>
        <HeaderNav />
        <h1>Welcome {user.username}! </h1>
        <h2>Your balance is: $‎{user.balance}</h2>
        <h3>Use the form below to request money!</h3>
        <form
          id="contact-form"
          onSubmit={this.handleSubmit.bind(this)}
          method="POST"
        >
          <div className="form-group">
            <label for="name">Your Name</label>
            <input type="text" className="form-control" id="name" placeholder="Your Name"/>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Send to this email address</label>
            <input
              placeholder="Email address"
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group">
            <label for="message">Message</label>
            <textarea 
              placeholder={`Hi USER, please send me $50 on PayPalClone ${this.props}`}
              className="form-control" 
              rows="5" 
              id="message" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  //Takes in Redux state
  return reduxState;
};

export default connect(
  mapStateToProps,
  { setBalance }
)(Request); //connect invoked returns a function, and then passes in register
