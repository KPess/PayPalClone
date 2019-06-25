//Send money to a user from balance.
//Take email into state on change.
//Take amount into state on change.
//Send email and amount as req.body with axios
//      1. Post new transaction including all relevant info to DB
//      2. Put new balance information through to DB for sender.
//      3. Put received funds into balance of recipient through DB.
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
      sendAmount: ""
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
            <Label for="recipEmail">
              <h2>Send money to another user</h2>
            </Label>
          </FormGroup>
          <FormGroup>
            <Label for="recipEmail">Email</Label>
            <Input
              onChange={this.handleChange}
              type="email"
              name="recipEmail"
              id="recipEmail"
              placeholder="Email address of recipient"
            />
          </FormGroup>
          <FormGroup>
            <Label for="sendAmount">Amount</Label>
            <Input
              onChange={this.handleChange}
              max={this.props.balance}
              min="5"
              type="number"
              name="sendAmount"
              id="sendAmount"
              placeholder="$xx.xx"
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
