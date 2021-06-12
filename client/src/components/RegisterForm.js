import React from "react";
import { login } from "../redux/actions";
import { connect } from "react-redux";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", registered: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async register() {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const data = { email: this.state.email };
    const resource = baseURL + "auth/register";
    await fetch(resource, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "appliction/json",
      },
    });

    this.props.login();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.register();
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
        <button type="submit">Register</button>
      </form>
    );
  }
}

export default connect(null, { login })(RegisterForm);
