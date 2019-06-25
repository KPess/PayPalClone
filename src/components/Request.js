//Request money from a user.
//Nodemailer will email them with a link
//They will log in and be shown the request.

import HeaderNav from "./Nav";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import { setBalance } from "../redux/reducer";
import { Button, Form, FormGroup, Label, Input} from "reactstrap";
import React from "react";
import Axios from "axios";

class Send extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipEmail: "",
      senderEmail: "",
      senderPassword: "",
      requestAmount: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    Axios.put(`/user/transactions/${this.props.user.id}`, {
      balance: this.state.sendAmount

    });
    console.log(this.props.user.id);
  };

  render() {
      if(!this.props.username) {
          return <Redirect to='/'/>
      }
    return (
      <div>
        <HeaderNav />
        <h1>Welcome {this.props.user.username}! </h1>
        <h2>Your balance is: $‎{this.props.balance}</h2>
        <Form id="sendForm">
          <FormGroup>
            <Label for="senderEmail">
              <h2>Request money from another user</h2>
            </Label>
          </FormGroup>
          <FormGroup>
            <Label for="senderEmail">Your Email</Label>
            <Input
              onChange={this.handleChange}
              type="email"
              name="senderEmail"
              id="senderEmail"
              placeholder="Email address of sender"
            />
          </FormGroup>
          <FormGroup>
            <Label for="senderPassword">Your Email Password</Label>
            <Input
              onChange={this.handleChange}
              type="password"
              name="senderPassword"
              id="senderPassword"
              placeholder="Your email password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="requestAmount">Request Amount</Label>
            <Input
              onChange={this.handleChange}
            //   max={this.props.balance}
              min="5"
              type="number"
              name="requestAmount"
              id="requestAmount"
              placeholder="$xx.xx"
            />
          </FormGroup>
          <FormGroup>
            <Label for="recipEmail">Request recipient's email</Label>
            <Input
              onChange={this.handleChange}
              type="email"
              name="recipEmail"
              id="recipEmail"
              placeholder="Email address of recipient"
            />
            <Button onClick={this.handleSubmit}>Submit</Button>
          </FormGroup>
        </Form>
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
)(Send); //connect invoked returns a function, and then passes in register
