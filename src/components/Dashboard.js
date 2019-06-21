import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {  resetReduxState, getTransactions, getRcvdTransactions, getSentTransactions } from '../redux/reducer';
import {Button} from 'reactstrap'
import HeaderNav from './Nav'
import Axios from 'axios';
import AllTransTable from './AllTransTable'
import UserRcvdTable from './UserRcvdTable'
import UserSentTable from './UserSentTable'


class Dashboard extends React.Component {
    state = {
        redirect: false,
        user: [],
        transactions: [],
        rcvdTransactions: [],
        sentTransactions: []
    }

    componentDidMount() {
        if(!this.props.user.username) {
            this.setState({redirect: true})
        }
        if(this.props.user.isadmin) {
            this.getAllTransactions()
        }
        if(!this.props.user.isadmin) {
            this.getSentTransactions()
        }
        if(!this.props.user.isadmin) {
            this.getRcvdTransactions()
        }
        // this.setState({user: this.props.user})
        // this.setState({transactions: this.props.transactions})

    }

    handleLogout = (e) => {
        //Call the logout path to activate authController.logout
        Axios.get('/auth/logout');
        //Redirect user to home
        this.props.history.push('/');
        this.props.resetReduxState();
    }

    getAllTransactions = (e) => {
        Axios.get('/transactions')
        .then( response => {
            this.props.getTransactions(response.data)
        })

    }
    getRcvdTransactions = (e) => {
        Axios.get('/user/rcvdtransactions')
        .then( response => {
            this.props.getRcvdTransactions(response.data)
        })

    }
    getSentTransactions = (e) => {
        Axios.get('/user/senttransactions')
        .then( response => {
            this.props.getSentTransactions(response.data)
        })

    }

    render() {
        if(this.state.redirect === true) {
            return <Redirect to='/register' />
        }
        const { user, transactions } = this.props
        // console.log(transactions)
        // console.log(user)
        return (
            <div>
                <HeaderNav/>
                <h1>Welcome {user.username}! </h1>
                <h2>Your balance is: {user.preferredCurrency}$‎{user.balance} or ɱ{user.balance} or €{user.balance} or CAD{user.balance}</h2>
                {user.isadmin  ? (
                <h3>You are an admin.</h3>
                ):false}

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
                <Button className="logout-button" onClick={this.handleLogout}>Log Out</Button>
                <AllTransTable/>
                <UserRcvdTable/>
                <UserSentTable/>
            </div>
          
        )
    }
}

const mapStateToProps = reduxState => {
    const { user, isadmin, transactions, sentTransactions, rcvdTransactions} = reduxState;
    return {user, isadmin, transactions, sentTransactions, rcvdTransactions}
};

export default connect(mapStateToProps, { resetReduxState, getTransactions, getRcvdTransactions, getSentTransactions})(Dashboard);