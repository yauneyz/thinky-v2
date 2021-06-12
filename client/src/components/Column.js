import React from "react";
import { setColumn, setColumns } from "../redux/actions";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  handleDataChange(event) {
    event.preventDefault();
    this.props.setColumn(this.props.id, this.props.name, event.target.value);
  }

  handleNameChange(event) {
    event.preventDefault();
    this.props.setColumn(this.props.id, event.target.value, this.props.data);
  }

  handleDelete(event) {
    event.preventDefault();
    let columns = this.props.columns;
    columns.splice(this.props.id, 1);
    this.props.setColumns(columns, this.props.active);
  }

  confirmDelete(event) {
    confirmAlert({
      message:
        "Are you sure to delete this column? Data will be permanantly lost.",
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
    // Get the list of elements
    return (
      <div>
        <input
          className="form-control"
          onChange={this.handleNameChange}
          value={this.props.name}
        />
        <div>
          <textarea
            rows="15"
            cols="30"
            className="form-control"
            onChange={this.handleDataChange}
            value={this.props.data}
          />
        </div>
        <div>
          <button className="btn btn-primary" onClick={this.confirmDelete}>
            Remove
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  const column = state.boards[state.active].columns[id];
  const columns = state.boards[state.active].columns;
  const active = state.active;

  return {
    id: id,
    name: column.name,
    data: column.data,
    columns: columns,
    active: active,
  };
};

export default connect(mapStateToProps, { setColumn, setColumns })(Column);
