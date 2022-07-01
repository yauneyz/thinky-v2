import React, { useContext, useState } from "react";
import { DisplayContext } from "../contexts";
import styled from "styled-components";
import { produce } from "immer";
import { TextField, Menu, MenuItem, ClickAwayListener } from "@mui/material";
import AxisNode from "./AxisNode";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faMinimize,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";

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

function menuOpen(event, index, setMouse, setMenuTarget) {
  event.preventDefault();
  setMouse({ X: event.clientX - 2, Y: event.clientY - 4 });
  setMenuTarget(index);
}

function menuClose(setMouse, setMenuTarget) {
  setMouse({ X: null, Y: null });
  setMenuTarget(-1);
}

const AxesListMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  height: 1em;
  margin-bottom: 2px;
  background: red;
`;

const AxesMenuButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  margin: 3px;
`;

export default function AxesList({ BC }) {
  const [selected, setSetlected] = useState(null);
  const { topNode, setTopNode } = useContext(DisplayContext);

  const zoomIn = (coord) => {
    setTopNode(coord);
  };

  const zoomOut = () => {
    setTopNode(topNode.slice(0, -1));
  };

  // Generate the list of axes
  const topBoard = BC.getBoard(topNode);
  return (
    <AxesWrapper>
      <AxesListMenu>
        <AxesMenuButton onClick={zoomOut}>
          <Icon icon={faArrowUp} size="lg" inverse />
        </AxesMenuButton>
        <AxesMenuButton onClick={BC.collapseBoards}>
          <Icon icon={faMinimize} size="lg" inverse />
        </AxesMenuButton>
        <AxesMenuButton onClick={BC.expandBoards}>
          <Icon icon={faExpand} size="lg" inverse />
        </AxesMenuButton>
      </AxesListMenu>
      <AxisNode
        selected={selected}
        setSetlected={setSetlected}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        board={topBoard}
        indent={0}
        BC={BC}
        coord={topNode}
      />
    </AxesWrapper>
  );
}
