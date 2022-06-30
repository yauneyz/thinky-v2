import React, { useContext, useState } from "react";
import { DisplayContext } from "../contexts";
import styled from "styled-components";
import { produce } from "immer";
import { TextField, Menu, MenuItem, ClickAwayListener } from "@mui/material";
import AxisNode from "./AxisNode";

const AxesWrapper = styled.div`
  width: 14em;
  border-right: 5px solid #910101;
  justify-content: start;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const AxesUL = styled.div`
  height: 100%;
  width: 100%;
  padding-left: 5px;
`;
function AxisLIBase({ className, children, index, setMouse, setMenuTarget }) {
  return (
    <div
      className={className}
      onContextMenu={(event) => menuOpen(event, index, setMouse, setMenuTarget)}
    >
      {children}
    </div>
  );
}

const AxisLI = styled(AxisLIBase)`
  color: white;
  font-size: 1em;
  font-weight: bold;
  word-wrap: break-word;
  padding: 5px;
`;

// Component for the text area
function AxisRenameInputBase({
  className,
  index,
  setRenameFocus,
  setMouse,
  setMenuTarget,
  trail,
  BC,
}) {
  const finish = () => finishRename(setRenameFocus, setMouse, setMenuTarget);
  return (
    <ClickAwayListener onClickAway={finish}>
      <TextField
        autoFocus
        onChange={(event) => updateBoardName(event, index, trail, BC)}
        className={className}
        size="small"
        onKeyDown={(event) => handleKeyPress(event, finish)}
      />
    </ClickAwayListener>
  );
}

function handleKeyPress(event, finish) {
  if (event.keyCode === 13) {
    finish();
  }
}

function updateBoardName(event, index, trail, BC) {
  const targetCoord = trail.concat([index]);
  const targetBoard = BC.getBoard(targetCoord);
  const newBoard = produce(targetBoard, (draft) => {
    draft.name = event.target.value;
  });
  BC.replaceBoard(targetCoord, newBoard);
}

function finishRename(setRenameFocus, setMouse, setMenuTarget) {
  menuClose(setMouse, setMenuTarget);
  setRenameFocus(-1);
}

const AxisRenameInput = styled(AxisRenameInputBase)`
  background-color: white;
`;

const AddButton = styled.button`
  border-radius: 5px;
  background-color: #gray;
`;

function AxisMenu({
  mouse,
  setMouse,
  setMenuTarget,
  rename,
  drillAxis,
  openAxis,
  deleteAxis,
}) {
  return (
    <Menu
      keepMounted
      open={mouse.Y !== null}
      onClose={() => menuClose(setMouse, setMenuTarget)}
      anchorReference="anchorPosition"
      anchorPosition={
        mouse.Y !== null && mouse.X !== null
          ? { top: mouse.Y, left: mouse.X }
          : undefined
      }
    >
      <MenuItem onClick={openAxis}>Open</MenuItem>
      <MenuItem onClick={drillAxis}>Expand</MenuItem>
      <MenuItem onClick={rename}>Rename</MenuItem>
      <MenuItem onClick={deleteAxis}>Delete</MenuItem>
    </Menu>
  );
}

function menuOpen(event, index, setMouse, setMenuTarget) {
  event.preventDefault();
  setMouse({ X: event.clientX - 2, Y: event.clientY - 4 });
  setMenuTarget(index);
}

function menuClose(setMouse, setMenuTarget) {
  setMouse({ X: null, Y: null });
  setMenuTarget(-1);
}

// The defaults for a new board
const newBoard = {
  name: "New Axis",
  children: [],
  text: "",
  expanded: false,
};

const AxesListMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 1em;
  margin-bottom: 2px;
  background: red;
`;

const ZoomOutButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  margin: 0;
`;

//Function to handle adding to the list
function handleAdd(BC, trail) {
  BC.addChild(trail, newBoard);
}

export default function AxesList({ BC }) {
  const [selected, setSetlected] = useState(null);
  const [topNode, setTopNode] = useState([]);

  const zoomIn = (coord) => {
    setTopNode(coord);
  };

  const zoomOut = () => {
    setTopNode(topNode.slice(0, -1));
  };

  const zoomOutAll = () => {
    setTopNode([]);
  };

  // Generate the list of axes
  const topBoard = BC.getBoard(topNode);
  return (
    <AxesWrapper>
      <AxesListMenu>
        <ZoomOutButton onClick={zoomOut}>Zoom Out</ZoomOutButton>
      </AxesListMenu>
      <AxisNode
        selected={selected}
        setSetlected={setSetlected}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        zoomOutAll={zoomOutAll}
        board={topBoard}
        indent={0}
        BC={BC}
        coord={topNode}
      />
    </AxesWrapper>
  );
}
