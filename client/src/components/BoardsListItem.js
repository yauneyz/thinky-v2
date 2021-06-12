import React from "react";
import { setColumn, setActiveBoard, setStoreState } from "../redux/actions";
import { connect } from "react-redux";

class BoardsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      index: props.index,
      active: props.active,
      editable: props.editable,
      makeActive: props.makeActive,
    };
  }

  render() {
    return <li>{this.state.name}</li>;
  }
}

export default BoardsListItem;
