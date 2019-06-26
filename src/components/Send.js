//Balances can go negative.
//What happens if an invalid amount or recipient ID is entered?
//Add a success message when transaction goes through
//Redirect to dashboard?


import HeaderNav from "./Nav";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setBalance } from "../redux/reducer";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import React from "react";
import Axios from "axios";

class Send extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipID: "",
      sendAmount: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // console.log(this.state);
  };
  handleSubmit = e => {
    e.preventDefault();
    Axios.put(`/user/transactions/`, {
      sendAmount: this.state.sendAmount,
      recipID: this.state.recipID,
      userid: this.props.user.id
    })
      .then(response => {
        // this.props.setUsername(response.data.username);
        this.props.setBalance(response.data[0].balance);
        
        // console.log(response)
        // this.props.setUser(response.data);
        // this.setState({ redirect: true });
      })
      .catch(error => {
        this.setState({ error: error.response.data.error });
      });
    // console.log(this.state, this.props);
  };

  render() {
    if (!this.props.username) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <HeaderNav />
        <h1>Welcome {this.props.user.username}! </h1>
        <h2>Your balance is: $‎{this.props.balance}</h2>
        <Form id="sendForm">
          <FormGroup>
            <Label for="recipID">
              <h2>Send money to another user</h2>
            </Label>
          </FormGroup>
          <FormGroup>
            <Label for="recipID">Recipient's User ID #</Label>
            <Input
              required
              onChange={this.handleChange}
              type="number"
              name="recipID"
              id="recipID"
              placeholder="User ID # of recipient"
            />
          </FormGroup>
          <FormGroup>
            <Label for="sendAmount">Amount</Label>
            <Input
              required
              onChange={this.handleChange}
              max={this.props.balance}
              min="5"
              type="number"
              name="sendAmount"
              id="sendAmount"
              placeholder="$XX.XX"
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
