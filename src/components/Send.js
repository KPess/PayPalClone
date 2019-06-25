//Send money to a user from balance.
//Take email into state on change.
//Take amount into state on change.
//Send email and amount as req.body with axios
//      1. Post new transaction including all relevant info to DB
//      2. Put new balance information through to DB for sender.
//      3. Put received funds into balance of recipient through DB.
import HeaderNav from "./Nav";
import { connect } from "react-redux";
import { setBalance } from "../redux/reducer";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import React from "react";

class Send extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        recipEmail: '',
        sendAmount: ''
    };
  }

  render() {
    return (
      <div>
        <HeaderNav />
        <h1>Welcome {this.props.user.username}! </h1>
        <h2>Your balance is: $‎{this.props.balance}</h2>
        <Form id="sendForm">
          <FormGroup>
            <Label for="recipEmail"><h2>Send money to another user</h2></Label>
          </FormGroup>
          <FormGroup>
            <Label for="recipEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="recipEmail"
              placeholder="Email address of recipient"
            />
          </FormGroup>
          <FormGroup>
            <Label for="sendAmount">Amount</Label>
            <Input
              max={this.props.balance}
              min="5"
              type="number"
              name="number"
              id="sendAmount"
              placeholder="$xx.xx"
            />
            <Button>Submit</Button>
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
