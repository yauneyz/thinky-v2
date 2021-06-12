import React from "react";
import { setIdeas } from "../redux/actions";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class Idea extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    let newIdeas = this.props.ideas;
    newIdeas[this.props.id] = event.target.value;
    this.props.setIdeas(newIdeas, this.props.active);
  }

  handleDelete(event) {
    event.preventDefault();
    let newIdeas = this.props.ideas;
    newIdeas.splice(this.props.id, 1);
    this.props.setIdeas(newIdeas, this.props.active);
  }

  confirmDelete(event) {
    confirmAlert({
      message:
        "Are you sure to delete this idea? Data will be permanantly lost.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.handleDelete(event),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  render() {
    return (
      <div>
        <div className="col-xl idea">
          <textarea
            rows="2"
            cols="60"
            width="100%"
            height="100%"
            value={this.props.idea}
            onChange={this.handleChange}
          />
        </div>
        <div className="idea-delete-btn">
          <button className="btn btn-primary" onClick={this.confirmDelete}>
            Remove
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const ideas = state.boards[state.active].ideas;
  const { active } = state;
  const { id } = ownProps;
  return {
    ideas: ideas,
    id: id,
    idea: ideas[id],
    active: active,
  };
};

export default connect(mapStateToProps, { setIdeas })(Idea);
