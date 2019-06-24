//ADD MONEY TO USER BALANCE WITH STRIPE.

import HeaderNav from "./Nav";
import {connect} from 'react-redux'
import {setBalance} from '../redux/reducer'
import React from 'react'

class Add extends React.Component {
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

export default connect(mapStateToProps, {setBalance})(Add); //connect invoked returns a function, and then passes in register
