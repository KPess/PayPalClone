import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from 'react-router-dom';
import { setBalance, setUsername } from '../redux/reducer';
import {connect} from 'react-redux'

class Register extends Component {
  constructor() {
    super(); //runs parent constructor
    this.state = {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      preferredCurrency: "",
      redirect: false,
      error: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.placeholder.toLowerCase()]: e.target.value
      //e accesses info about the event.
      // Target targets the element that triggered the event(the same input field or button).
      // Placeholder accesses the placeholder name from the element.
      // toLowerCase() invoked matches the placeholder to the lowercase variables.
    });
  };

  handleClick = e => {
      Axios.post('/auth/register/user', {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        preferredCurrency: this.state.preferredCurrency
      }).then( response => {
            this.props.setUsername(response.data.username);
            this.props.setBalance(response.data.balance);
            this.setState({redirect: true});
      }).catch( error => {
          this.setState({error: error.response.data.error});
      })
  }
  render() {

    if(this.state.redirect === true) {
        return <Redirect to='/dashboard' />
    }

    return (
      <div>
        <h1>Register Today!</h1>
        <h3>{this.state.error}</h3>
        <form>
        <input placeholder="Username" onChange={this.handleChange} />
        <input placeholder="Password" onChange={this.handleChange} />
        <input placeholder="Email" onChange={this.handleChange} />
        <input placeholder="FirstName" onChange={this.handleChange} />
        <input placeholder="LastName" onChange={this.handleChange} />
        <select type="select" name="PreferredCurrency" placeholder="preferredcurrency" onChange={this.handleChange}>
            <option>USD</option>
            <option>Euros</option>
            <option>Canuck Bucks</option>
        </select>
        <button onClick={this.handleClick}>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => { //Takes in Redux state
    return {
        username: state.username, //Maps certain parts of state to props. The key name can be changed and passed as a prop with that name
        balance: state.balance, // Prop name on the left, prop value on the right
        loginFirst: state.loginFirst
    }
}

export default connect(mapStateToProps, {setBalance, setUsername})(Register); //connect invoked returns a function, and then passes in register
