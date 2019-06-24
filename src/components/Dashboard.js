import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  resetReduxState,
  getTransactions,
  getRcvdTransactions,
  getSentTransactions
} from "../redux/reducer";
import HeaderNav from "./Nav";
import Axios from "axios";
import AllTransTable from "./AllTransTable";
import UserRcvdTable from "./UserRcvdTable";
import UserSentTable from "./UserSentTable";
import UpdateBalance from "./UpdateBalance";
import { Button } from "reactstrap";

class Dashboard extends React.Component {
  state = {
    redirect: false,
    user: [],
    transactions: [],
    rcvdTransactions: [],
    sentTransactions: []
  };

  componentDidMount() {
    if (!this.props.user.username) {
      this.setState({ redirect: true });
    }
    if (this.props.user.isadmin) {
      this.getAllTransactions();
    }
    if (!this.props.user.isadmin) {
      this.getSentTransactions();
    }
    if (!this.props.user.isadmin) {
      this.getRcvdTransactions();
    }
    // this.setState({user: this.props.user})
    // this.setState({transactions: this.props.transactions})
  }

  // handleLogout = (e) => {
  //     //Call the logout path to activate authController.logout
  //     Axios.get('/auth/logout');
  //     //Redirect user to home
  //     this.props.history.push('/');
  //     this.props.resetReduxState();
  // }

  getAllTransactions = e => {
    Axios.get("/transactions").then(response => {
      this.props.getTransactions(response.data);
    });
  };
  getRcvdTransactions = e => {
    Axios.get("/user/rcvdtransactions").then(response => {
      this.props.getRcvdTransactions(response.data);
    });
  };
  getSentTransactions = e => {
    Axios.get("/user/senttransactions").then(response => {
      this.props.getSentTransactions(response.data);
    });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/register" />;
    }
    const { user, balance } = this.props;
    // console.log(transactions)
    // console.log(user)
    return (
      <div>
        <HeaderNav />
        <h1>Welcome {user.username}! </h1>
        <h2>Your balance is: $‎{balance}</h2>

        {/* 
                1. After logout the home page still shows user's name 
                - did logout work? SOLVED

                2. Unable to accurately display whether 
                the current user is admin - SOLVED


                3. REPLACE $ WITH SYMBOL OF CURRENT USER'S 
                PREFERRED CURRENCY FROM DB - PENDING

                4. Pulling username and balance from REDUX causes them 
                to reset when the page is refreshed. These should be pulled 
                from the session cookie or database. PENDING
                */}
        {/* <Button className="logout-button" onClick={this.handleLogout}>Log Out</Button> */}
        {user.isadmin ? (
          <h2>
            You are an admin.
            <UpdateBalance />
            <AllTransTable />
          </h2>
        ) : (
          <h2>
            <UserRcvdTable />
            <UserSentTable />
          </h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const {
    user,
    isadmin,
    transactions,
    sentTransactions,
    rcvdTransactions,
    balance
  } = reduxState;
  return { user, isadmin, transactions, sentTransactions, rcvdTransactions, balance };
};

export default connect(
  mapStateToProps,
  { resetReduxState, getTransactions, getRcvdTransactions, getSentTransactions }
)(Dashboard);
