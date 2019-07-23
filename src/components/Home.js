import React from "react";
import HeaderNav from "./Nav";
import { connect } from "react-redux";
import { resetReduxState } from "../redux/reducer";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import homebackground from "../homebackground.jpg";
import "./Home.css";

class Home extends React.Component {
  handleLogout = e => {
    //Call the logout path to activate authController.logout
    Axios.get("/auth/logout");
    //Redirect user to home
    this.props.history.push("/");
    this.props.resetReduxState();
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <div class="HomeHeader">
        <HeaderNav /></div>
        <div class="HomeContainer">
          <div class="HomeSpan">
            <h3> With PayPal, you can pay your way.</h3>
            {/* <div>
            <img src={homebackground} alt="homebackground" />
          </div> */}
            <div>
              {user.username ? (
                <div>
                  <h5>You are currently logged in as: {user.username}</h5>
                  <Button className="logout-button" onClick={this.handleLogout}>
                    Log Out
                  </Button>
                </div>
              ) : (
                false
              )}
            </div>
            <div>
              {!user.username ? (
                <h5>Please <Link to="/register"><a id="signuplink">sign up</a></Link> or <Link to="/login"><a id="loginlink">log in</a></Link> to start</h5>
              ) : (
                false
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { user } = reduxState;
  return { user };
}

export default connect(
  mapStateToProps,
  { resetReduxState }
)(Home);
