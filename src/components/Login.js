import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from 'react-router-dom';
import { setUsername, setBalance, setUser } from '../redux/reducer';
import {connect} from 'react-redux'
import HeaderNav from './Nav'

export class Login extends Component {
  constructor() {
    super(); //runs parent constructor
    this.state = {
      username: "",
      password: "",
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
    // console.log(e.target.value)
  };

  handleClick = (e) => {
    e.preventDefault()
    const {username, password} = this.state
    // Prevent default prevents the page from re-rendering 
    // when the submit button is PermissionRequestedEvent, 
    // which was breaking stuff.
    Axios.post('/auth/login/user', {
      username,
      password
    }).then( response => {
          this.props.setUsername(response.data.username);
          this.props.setBalance(response.data.balance);
          this.props.setUser(response.data);
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
        <HeaderNav/>
        <h1>Log in</h1>
        <h3>{this.state.error}</h3>
        <form>
        <input required placeholder="Username" name="username" onChange={this.handleChange} />
        <input required placeholder="Password" name="password" onChange={this.handleChange} />
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
        loginFirst: state.loginFirst,
        isAdmin: state.isAdmin
    }
}

export default connect(mapStateToProps, {setUsername, setBalance, setUser})(Login); //connect invoked returns a function, and then passes in register
