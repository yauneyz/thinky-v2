import React from "react";
import { logout } from "../redux/actions";
import { connect } from "react-redux";

class LogoutButton extends React.Component {
  async logout() {
    await fetch("auth/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Tell the system we've logged in
    this.props.logout();
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.logout();
  }

  render() {
    return (
      <button className="btn btn-primary" onClick={this.handleClick}>
        Logout
      </button>
    );
  }
}

export default connect(null, { logout })(LogoutButton);
