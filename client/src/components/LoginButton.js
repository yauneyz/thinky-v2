import React from "react";
import { login, setStoreState } from "../redux/actions";
import { connect } from "react-redux";

class LoginButton extends React.Component {
  async login() {
    const baseURL = "http://localhost:8000/";
    const data = { email: this.state.email };
    await fetch("/auth/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Tell the system we've logged in
    this.props.login();
  }

  constructor(props) {
    super(props);
    this.state = { email: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.login();
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default connect(null, { login, setStoreState })(LoginButton);
