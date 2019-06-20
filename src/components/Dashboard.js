import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setLoginFirst, resetReduxState } from '../redux/reducer';
import HeaderNav from './Nav'
import Axios from 'axios';
class Dashboard extends React.Component {
    state = {
        redirect: false,
        user: []
    }

    componentDidMount() {
        if(!this.props.user.username) {
            this.setState({redirect: true})
            
            // this.props.setLoginFirst();
        }
        this.setState({user: this.props.user})

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
        const { user } = this.props

        console.log(user)
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
    const { user, isadmin } = reduxState;
    return {user, isadmin}
};

export default connect(mapStateToProps, {setLoginFirst, resetReduxState})(Dashboard);