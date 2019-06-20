import React from 'react';
import HeaderNav from './Nav'
import {connect} from 'react-redux'

class Home extends React.Component {
	render() {

	const {user} = this.props
	return (
		<div className='Home'>
			<HeaderNav/>
            <h1> Welcome to PayPal</h1>
			{user.username ? (
			<h2>You are currently logged in as: {user.username}</h2>
			):false
			}

		</div>
	)}
}


function mapStateToProps(reduxState) {
	const {user} = reduxState
	return {user}
};

export default connect(mapStateToProps)(Home);
