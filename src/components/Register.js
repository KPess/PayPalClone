import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from 'react-router-dom';
import { setBalance, setUsername, setUser } from '../redux/reducer';
import {connect} from 'react-redux'
import {Button} from 'reactstrap'
import HeaderNav from './Nav'

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
  };

  handleDropdownChange = e => {
    this.setState({
      preferredCurrency: e.target.value
      //e accesses info about the event.
      // Target targets the element that triggered the event(the same input field or button).
      // Placeholder accesses the placeholder name from the element.
      // toLowerCase() invoked matches the placeholder to the lowercase variables.
    });
    // console.log(this.state.preferredCurrency);
  };

  handleClick = (e) => {
      e.preventDefault()
      // Prevent default prevents the page from re-rendering 
      // when the submit button is pressed, 
      // which was breaking stuff.
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
            this.props.setUser(response.data);
            this.setState({redirect: true});

      }).catch( error => {
          this.setState({error: error.response.data.error});
      })
  }

  /* There are currently three issues with the submit button.
     1. The url changes to have query parameters that should 
     not be visible, such as the password. 
     
     Solution: This was a problem with REDIRECT

     2.Sometimes the error message does not work on the first 
     submission of a duplicate username. 

     Solution: This was a problem with REDIRECT

     3. Registering a new user does not successfully redirect
     to the Dashboard page for the user. 
  */

  render() {

    if(this.state.redirect === true) {
        return <Redirect to='/dashboard' />
    }

    if(this.props.username){
      return <Redirect to='/dashboard'/>
    }

    
    return (
      <div className="Home">
        <HeaderNav/>
        <h1>Register Today!</h1>
        <h3>{this.state.error}</h3>
        <form id="register-form">
        <input style={{margin: '.25em'}} required placeholder="Username" name="username" onChange={this.handleChange} />
        <input style={{margin: '.25em'}}required placeholder="Password" name="password" type="password" onChange={this.handleChange} />
        <input style={{margin: '.25em'}}required placeholder="Email" name="email" onChange={this.handleChange} />
        <input style={{margin: '.25em'}}required placeholder="First Name" name="firstName"onChange={this.handleChange} />
        <input style={{margin: '.25em'}}required placeholder="Last Name" name="lastName" onChange={this.handleChange} />
        {/* <select required id="currencyDropdown" name="preferredCurrency" onChange={this.handleDropdownChange}>
            <option value="" disabled selected hidden>Select your preferred currency</option>
            <option>USD</option>
            <option>Euros</option>
            <option>Canuck Bucks</option>
        </select> */}
        <Button style={{margin: '2em'}} onClick={this.handleClick}>Submit</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = reduxState => { //Takes in Redux state
    return reduxState
}

export default connect(mapStateToProps, {setBalance, setUsername, setUser})(Register); //connect invoked returns a function, and then passes in register
