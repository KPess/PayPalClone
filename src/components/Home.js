import React from "react";
import HeaderNav from "./Nav";
import { connect } from "react-redux"
import {resetReduxState} from '../redux/reducer'
import {Button} from 'reactstrap'
import Axios from 'axios'
import homebackground from '../homebackground.jpg'

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
        <h1> With PayPal, you can pay your way.</h1>
        <div><img src={homebackground} alt="homebackground"/></div>
        <div>
          {user.username ? (
            <div>
              <h2>You are currently logged in as: {user.username}</h2>
              <Button className="logout-button" onClick={this.handleLogout}>Log Out</Button>
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
