import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setLoginFirst, resetReduxState } from '../redux/reducer';
import HeaderNav from './Nav'
import Axios from 'axios';
class Dashboard extends React.Component {
    state = {
        redirect: false
    }

    componentDidMount() {
        if(!this.props.username) {
            this.setState({redirect: true})
            // this.props.setLoginFirst();
        }
    }

    handleLogout = (e) => {
        //Call the logout path to activate authController.logout
        Axios.get('/auth/logout');
        //Redirect user to home
        this.props.history.push('/');
        this.props.resetReduxState();
    }


    
    render() {
        if(this.state.redirect === true) {
            return <Redirect to='/register' />
        }
        const { isAdmin } = this.props
        console.log({isAdmin})
        return (
            <div>
                <HeaderNav/>
                <h1>Welcome {this.props.username}! </h1>
                <h2>Your balance is: {this.props.preferredCurrency}$‎{this.props.balance} or ɱ{this.props.balance} or €{this.props.balance} or CAD{this.props.balance}</h2>
                <h3>Are you an admin? {this.props.isAdmin}</h3>
                {/* 
                1. After logout the home page still shows user's name 
                - did logout work? SOLVED

                2. Unable to accurately display whether 
                the current user is admin - PENDING

                    Ideas - Pull admin status from DB
                    and store in redux state for all 
                    components at login.

                3. REPLACE $ WITH SYMBOL OF CURRENT USER'S 
                PREFERRED CURRENCY FROM DB - PENDING

                4. Pulling username and balance from REDUX causes them 
                to reset when the page is refreshed. These should be pulled 
                from the session cookie or database. PENDING
                */}
                <button onClick={this.handleLogout}>Log Out</button>
            </div>
          
        )
    }
}

const mapStateToProps = reduxState => {
    return reduxState;
};

export default connect(mapStateToProps, {setLoginFirst, resetReduxState})(Dashboard);