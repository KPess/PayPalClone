import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from 'react-router-dom';
import { setUsername, setBalance, setUser, getTransactions } from '../redux/reducer';
import {connect} from 'react-redux'
import {Button} from 'reactstrap'
import HeaderNav from './Nav'

export class Login extends Component {
  constructor() {
    super(); //runs parent constructor
    this.state = {
      username: "",
      password: "",
      redirect: false,
      error: "",
      transactions: []
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
          // this.props.getTransactions(response.transactions.data);
          // console.log(response)
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
        <form id="register-form">
        <input style={{margin: '.25em'}} required placeholder="Username" name="username" onChange={this.handleChange} />
        <input style={{margin: '.25em'}} required placeholder="Password" name="password" type="password" onChange={this.handleChange} />
        <div style={{margin: '2em'}}><Button onClick={this.handleClick}>Submit</Button></div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => { //Takes in Redux state
    return {
        username: state.username, //Maps certain parts of state to props. The key name can be changed and passed as a prop with that name
        balance: state.balance, // Prop name on the left, prop value on the right
        isAdmin: state.isAdmin,
        transactions: state.transactions
    }
}

export default connect(mapStateToProps, {setUsername, setBalance, setUser, getTransactions})(Login); //connect invoked returns a function, and then passes in register
