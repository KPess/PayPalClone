import React from 'react';
import HeaderNav from './Nav'
import {connect} from 'react-redux'

class Home extends React.Component {
	render() {
	return (
		<div className='Home'>
			<HeaderNav/>
            <h1> Welcome to PayPal</h1>
			<h2>You are currently logged in as: {this.props.username}</h2>

		</div>
	)}
}


function mapStateToProps(reduxState) {
	const {username} = reduxState
	return {username}
};

export default connect(mapStateToProps)(Home);
