//Balances can go negative.
//What happens if an invalid amount or recipient ID is entered?
//Add a success message when transaction goes through
//Redirect to dashboard?

import HeaderNav from "./Nav";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setUser } from "../redux/reducer";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import React from "react";
import Axios from "axios";
import hypepotamus from '../hypepotamus.jpg'

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
  };
  handleSubmit = e => {
    e.preventDefault();
    Axios.put(`/user/transactions/`, {
      sendAmount: this.state.sendAmount,
      recipID: this.state.recipID,
      userid: this.props.user.id
    })
      .then(response => {
        // console.log(response.data)
        this.props.setUser(response.data[0]);
        alert(`Transaction successful`);
      })
      .catch(error => {
        // console.log(error)
        this.setState({ error: error });
      });
  };

  render() {
    const { user } = this.props;
    if (!user.username) {
      return <Redirect to="/" />;
    }
    return (
      <div className="Home">
        <HeaderNav />
        <h1>Welcome {user.username}! </h1>
        <h2>Your balance is: $‎{user.balance}</h2>
        <div><img src={hypepotamus} alt="hypepotamus"/></div>
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
              max={user.balance}
              min="5"
              type="number"
              name="sendAmount"
              id="sendAmount"
              placeholder="$XX.XX"
            />
            <Button style={{'margin-top': '2em'}}onClick={this.handleSubmit}>Submit</Button>
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
  { setUser }
)(Send); //connect invoked returns a function, and then passes in register
