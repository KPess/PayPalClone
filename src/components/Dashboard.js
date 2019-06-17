import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setLoginFirst } from '../redux/reducer';

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
                <h1>Welcome {this.props.username}! Your Balance Is:</h1>
                {this.props.balance}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return reduxState;
};

export default connect(mapStateToProps, {setLoginFirst})(Dashboard);