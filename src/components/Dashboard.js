import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setLoginFirst } from '../redux/reducer';
import HeaderNav from './Nav'
class Dashboard extends React.Component {
    state = {
        redirect: false
    }

    componentDidMount() {
        if(!this.props.username) {
            this.setState({redirect: true})
            this.props.setLoginFirst();
        }
    }

    render() {
        if(this.state.redirect === true) {
            return <Redirect to='/register' />
        }
        return (
            
            <div>
                <HeaderNav/>
                <h1>Welcome {this.props.username}! </h1>
                <h2>Your balance is: ${this.props.balance}</h2>
                {/* Pulling username and balance from REDUX causes them 
                to reset when the page is refreshed. These should be pulled 
                from the session or database. */}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return reduxState;
};

export default connect(mapStateToProps, {setLoginFirst})(Dashboard);