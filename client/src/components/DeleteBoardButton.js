import React from "react";
import { setColumn, setActiveBoard, setStoreState } from "../redux/actions";
import { connect } from "react-redux";

class DeleteBoardButton extends React.Component {
  constructor(props) {
    super(props);

    this.deleteBoard = this.deleteBoard.bind(this);
  }

  deleteBoard(event) {
    event.preventDefault();
    // The next active board is the one immediately following it, unless
    // the one being deleted is the last one

    let boards = this.props.boards;

    // Don't let them delete their last board
    if (boards.length === 1) {
      return;
    }
    const active = this.props.active;
    const nextActive = Math.min(active, boards.length - 2);
    boards.splice(active, 1);
    const newBoards = [...boards];
    this.props.setActiveBoard(nextActive);
    this.props.setStoreState(newBoards);
  }

  render() {
    return (
      <button className="btn btn-primary" onClick={this.deleteBoard}>
        Delete Board
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  const { boards, active } = state;
  return {
    boards: boards,
    active: active,
  };
};

export default connect(mapStateToProps, {
  setColumn,
  setActiveBoard,
  setStoreState,
})(DeleteBoardButton);
