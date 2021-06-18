import React from "react";
import { setRandom } from "../redux/actions";
import { connect } from "react-redux";
class RandomizeButton extends React.Component {
  render() {
    return (
      <button className="btn btn-primary" onClick={this.props.setRandom}>
        Refresh Random
      </button>
    );
  }
}

export default connect(null, { setRandom })(RandomizeButton);
