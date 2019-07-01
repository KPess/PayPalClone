import React from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { Button } from "reactstrap";
import { setUser } from "../redux/reducer";

class UpdateBalance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newBalance: 0,
      error: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
      //e accesses info about the event.
      // Target targets the element that triggered the event(the same input field or button).
      // Placeholder accesses the placeholder name from the element.
      // toLowerCase() invoked matches the placeholder to the lowercase variables.
    });
    // console.log(e.target.value);
  };

  handleClick = e => {
    e.preventDefault();
    Axios.put(`/user/balance/18`, {
      balance: this.state.newBalance
    })
      .then(response => {
          console.log(response.data)
        this.props.setUser(response.data[0])
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };

  render() {
    console.log(this.props.user)
    return (
      <div>
        <input
          name="newBalance"
          placeholder="New Balance"
          onChange={this.handleChange}
        />
        <Button onClick={this.handleClick}>Update Balance</Button>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(
  mapStateToProps,
  { setUser }
)(UpdateBalance);
