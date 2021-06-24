import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {
  setActiveBoard,
  setStoreState,
  renameBoard,
  deleteBoard,
  reorderIdeas,
  reorderBoards,
  reorderColumns,
} from "../redux/actions";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import mongoose from "mongoose";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class BoardsList extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      mouseX: null,
      mouseY: null,
      selected: null,
      renameFocus: null,
      boardNames: this.props.boards.map((board) => board.name),
    };
    this.state = this.initialState;
    this.addBoard = this.addBoard.bind(this);
    this.menuOpen = this.menuOpen.bind(this);
    this.menuClose = this.menuClose.bind(this);
    this.openBoardRename = this.openBoardRename.bind(this);
    this.makeActive = this.makeActive.bind(this);
    this.deleteSelectedBoard = this.deleteSelectedBoard.bind(this);
    this.handleClickAway = this.handleClickAway.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateBoardNames = this.updateBoardNames.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }
  makeActive(index) {
    this.props.setActiveBoard(index);
  }

  getNewColumn() {
    const id = mongoose.Types.ObjectId().toHexString();
    const newColumn = {
      _id: id,
      name: "",
      data: "",
    };
    return newColumn;
  }

  getNewIdea() {
    const id = mongoose.Types.ObjectId().toHexString();
    const newIdea = {
      _id: id,
      data: "",
    };
    return newIdea;
  }

  addBoard(event) {
    event.preventDefault();
    let boards = this.props.boards;
    const newBoardIndex = boards.length;
    const newId = mongoose.Types.ObjectId().toHexString();
    const newBoard = {
      _id: newId,
      name: "New Board",
      columns: [
        this.getNewColumn(),
        this.getNewColumn(),
        this.getNewColumn(),
        this.getNewColumn(),
      ],
      ideas: [this.getNewIdea(), this.getNewIdea(), this.getNewIdea()],
    };
    console.log("new board: ", newBoard);
    boards.push(newBoard);
    this.props.setStoreState(boards);
    this.props.setActiveBoard(newBoardIndex);
    this.resetBoardNames();
  }

  openBoardRename(event) {
    this.menuClose();
    this.setState({ renameFocus: this.state.selected });
  }

  // Pick up on enter and escape presses
  handleKeyPress(event, index) {
    if (event.keyCode === 13 || event.keyCode === 27) {
      this.handleClickAway(event, index);
    }
  }

  handleClickAway(_event, index) {
    this.props.renameBoard(index, this.state.boardNames[index]);
    this.setState({ renameFocus: null });
  }

  confirmDelete(selected) {
    this.menuClose();
    confirmAlert({
      message:
        "Are you sure to delete this board? Data will be permanantly lost.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteSelectedBoard(selected),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  deleteSelectedBoard(selected) {
    this.props.deleteBoard(selected);
    this.menuClose();
    this.resetBoardNames();
  }

  resetBoardNames() {
    this.setState({ boardNames: this.props.boards.map((board) => board.name) });
  }

  menuOpen(event, index) {
    event.preventDefault();
    this.setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      selected: index,
    });
  }

  menuClose() {
    this.setState({
      ...this.initialState,
      boardNames: this.state.boardNames,
    });
  }

  updateBoardNames(event, index) {
    this.setState({
      boardNames: this.state.boardNames.map((name, i) => {
        if (i === index) {
          return event.target.value;
        } else {
          return name;
        }
      }),
    });
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    this.props.reorderBoards(result.source.index, result.destination.index);
  }

  render() {
    const boards = this.props.boards;
    const active = this.props.active;
    const boardNames = this.state.boardNames;

    // Solve scoping issues
    const renameFocus = this.state.renameFocus;
    const makeActive = this.makeActive;
    const menuOpen = this.menuOpen;
    const handleClickAway = this.handleClickAway;
    const handleKeyPress = this.handleKeyPress;
    const updateBoardNames = this.updateBoardNames;

    const boardsList = boards.map(function (board, index) {
      let inner = null;
      if (index === renameFocus) {
        inner = (
          <ClickAwayListener
            onClickAway={(event) => handleClickAway(event, index)}
          >
            <TextField
              value={boardNames[index]}
              autoFocus="true"
              onChange={(event) => updateBoardNames(event, index)}
              onKeyDown={(event) => handleKeyPress(event, index)}
              key={board._id}
            />
          </ClickAwayListener>
        );
      }
      // The normal listing
      else {
        inner = (
          <li
            onClick={() => makeActive(index)}
            onContextMenu={(event) => menuOpen(event, index)}
            key={board._id}
            className={active === index ? "board-name active" : "board-name"}
          >
            {board.name}
          </li>
        );
      }
      return (
        <Draggable key={board._id} draggableId={board._id} index={index}>
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                {inner}
              </div>
            );
          }}
        </Draggable>
      );
    });

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="boardsList">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="sidenav"
            >
              <ul>{boardsList}</ul>
              <Menu
                keepMounted
                open={this.state.mouseY !== null}
                onClose={this.menuClose}
                anchorReference="anchorPosition"
                anchorPosition={
                  this.state.mouseY !== null && this.state.mouseX !== null
                    ? { top: this.state.mouseY, left: this.state.mouseX }
                    : undefined
                }
              >
                <MenuItem onClick={this.openBoardRename}>Rename</MenuItem>
                <MenuItem
                  onClick={(_event) => this.confirmDelete(this.state.selected)}
                >
                  Delete
                </MenuItem>
              </Menu>

              {provided.placeholder}

              <button className="btn add-board" onClick={this.addBoard}>
                Add Board
              </button>
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
  deleteBoard,
  setActiveBoard,
  setStoreState,
  renameBoard,
  reorderIdeas,
  reorderBoards,
  reorderColumns,
})(BoardsList);
