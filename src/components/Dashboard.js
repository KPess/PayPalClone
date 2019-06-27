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
    this.getAllTransactions();
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
      return <Redirect to="/" />;
    }
    const { user } = this.props;
    return (
      <div>
        <HeaderNav />
        <h1>Welcome {user.username}! </h1>
        <h2>Your balance is: $‎{user.balance}</h2>

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
