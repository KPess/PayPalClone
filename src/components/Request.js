//Request money from a user.
//Nodemailer will email them with a link
//They will log in and be shown the request.

import HeaderNav from "./Nav";
import {connect} from 'react-redux'
import {setBalance} from '../redux/reducer'
import React from 'react'

class Request extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div><HeaderNav/></div>
        )
    }
}


const mapStateToProps = reduxState => { //Takes in Redux state
    return reduxState
}

export default connect(mapStateToProps, {setBalance})(Request); //connect invoked returns a function, and then passes in register
