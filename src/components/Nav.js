import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { resetReduxState, setUser } from "../redux/reducer";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";
import './Nav.css'

class HeaderNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      user: []
    };
  }

  componentDidMount() {
    Axios.get("/auth/session").then(user => {
      this.props.setUser(user.data);
      this.setState({ user: user.data });
    });
  }
  handleLogout = e => {
    //Call the logout path to activate authController.logout
    Axios.get("/auth/logout");
    //Redirect user to home
    // this.props.history.push('/');
    this.props.resetReduxState();
  };
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar id="navbar1" color="dark" dark expand="md">
          <NavbarBrand href="/#/">PayPal</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.props.user.username ? (
                <NavItem>
                  <Link to="/dashboard">
                    <Button>Dashboard</Button>
                  </Link>
                </NavItem>
              ) : (
                false
              )}
              {!this.props.user.username ? (
                <NavItem>
                  <Link to="/register">
                    {" "}
                    <Button>Sign Up</Button>
                  </Link>
                </NavItem>
              ) : (
                false
              )}
              {!this.props.user.username ? (
                <NavItem>
                  <Link to="/login">
                    <Button
                    id="nav-login-button">Log In</Button>
                  </Link>
                </NavItem>
              ) : (
                false
              )}
              {this.props.user.username ? (
                <NavItem>
                  <Link to="/">
                    <Button
                      className="logout-button"
                      onClick={this.handleLogout}
                    >
                      Log Out
                    </Button>
                  </Link>
                </NavItem>
              ) : (
                false
              )}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to="/send">
                    <DropdownItem>Send Money</DropdownItem>
                  </Link>
                  <Link to="/request">
                    <DropdownItem>Request Money</DropdownItem>
                  </Link>
                  <DropdownItem divider />
                  <Link to="/add">
                    <DropdownItem>Donate Money</DropdownItem>
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(
  mapStateToProps,
  { resetReduxState, setUser }
)(HeaderNav);
