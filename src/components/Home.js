import React from "react";
import HeaderNav from "./Nav";
import { connect } from "react-redux"
import {resetReduxState} from '../redux/reducer'
import Axios from 'axios'

class Home extends React.Component {

  handleLogout = (e) => {
    //Call the logout path to activate authController.logout
    Axios.get('/auth/logout');
    //Redirect user to home
    this.props.history.push('/');
    this.props.resetReduxState();
}

  render() {
    const { user } = this.props;
    return (
      <div className="Home">
        <HeaderNav />
        <h1> Welcome to PayPal</h1>
        <div>
          {user.username ? (
            <div>
              <h2>You are currently logged in as: {user.username}</h2>
              <button onClick={this.handleLogout}>Log Out</button>
            </div>
          ) : (
            false
          )}
        </div>
        <div>
          {!user.username ? <h2>Please sign up or log in to start</h2> : false}
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { user } = reduxState;
  return { user };
}

export default connect(mapStateToProps, {resetReduxState})(Home);
