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
      [e.target.name]: e.target.value
      //e accesses info about the event.
      // Target targets the element that triggered the event(the same input field or button).
      // Placeholder accesses the placeholder name from the element.
      // toLowerCase() invoked matches the placeholder to the lowercase variables.
    });
    console.log(e.target.value)
  };

  handleDropdownChange = e => {
    this.setState({
      preferredCurrency: e.target.value
      //e accesses info about the event.
      // Target targets the element that triggered the event(the same input field or button).
      // Placeholder accesses the placeholder name from the element.
      // toLowerCase() invoked matches the placeholder to the lowercase variables.
    });
    console.log(this.state.preferredCurrency);
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
    console.log(this.state)
    if(this.state.redirect === true) {
        return <Redirect to='/dashboard' />
    }

    return (
      <div>
        <h1>Register Today!</h1>
        <h3>{this.state.error}</h3>
        <form>
        <input required placeholder="Username" name="username" onChange={this.handleChange} />
        <input required placeholder="Password" name="password" onChange={this.handleChange} />
        <input required placeholder="Email" name="email" onChange={this.handleChange} />
        <input required placeholder="First Name" name="firstName"onChange={this.handleChange} />
        <input required placeholder="Last Name" name="lastName" onChange={this.handleChange} />
        <select required id="currencyDropdown" name="preferredCurrency" onChange={this.handleDropdownChange}>
            <option value="" disabled selected hidden>Select your preferred currency</option>
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
