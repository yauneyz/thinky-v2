import React, { useContext, useState } from "react";
import { TrailContext, OpenContext } from "../contexts";
import styled from "styled-components";
import { produce } from "immer";
import { TextField, Menu, MenuItem, ClickAwayListener } from "@mui/material";
import arrayEqual from "array-equal";

const AxesWrapper = styled.div`
  width: 14em;
  border-right: 5px solid #910101;
  justify-content: start;
  display: flex;
  flex-direction: column;
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
  BC.setBoards(targetCoord, newBoard);
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
  openEditor,
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
      <MenuItem onClick={openEditor}>Open</MenuItem>
      <MenuItem onClick={drillAxis}>Expand</MenuItem>
      <MenuItem onClick={rename}>Rename</MenuItem>
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
};

//Function to handle adding to the list
function handleAdd(BC, trail) {
  BC.addChild(trail, newBoard);
}

export default function AxesList({ BC }) {
  const { trail, setTrail } = useContext(TrailContext);
  const { open, setOpen } = useContext(OpenContext);
  const [mouse, setMouse] = useState({ X: null, Y: null });
  const [renameFocus, setRenameFocus] = useState(-1);
  const [menuTarget, setMenuTarget] = useState(-1);

  // There are the methods that power the menu options
  const openEditor = () => {
    // Check to see if we already have this coordinate
    let uniqueCoord = true;
    const newCoord = trail.concat([menuTarget]);
    for (const coord of open) {
      if (arrayEqual(coord, newCoord)) {
        uniqueCoord = false;
      }
    }
    if (uniqueCoord) {
      const newOpen = produce(open, (draft) => {
        draft.push(newCoord);
      });
      setOpen(newOpen);
    }
    menuClose(setMouse, setMenuTarget);
  };

  const drillAxis = () => {
    setTrail(trail.concat([menuTarget]));
    menuClose(setMouse, setMenuTarget);
  };

  const rename = () => {
    setRenameFocus(menuTarget);
    setMenuTarget(-1);
    setMouse({ X: null, Y: null });
  };

  // Generate the list of axes
  const axesList = BC.getBoard(trail).children.map((board, index) => {
    if (renameFocus == index) {
      // Handle case when we are renaming this one

      return (
        <AxisRenameInput
          key={index}
          index={index}
          setRenameFocus={setRenameFocus}
          setMouse={setMouse}
          setMenuTarget={setMenuTarget}
          trail={trail}
          BC={BC}
        />
      );
    } else {
      //The normal case

      return (
        <AxisLI
          key={index}
          index={index}
          setMouse={setMouse}
          setMenuTarget={setMenuTarget}
        >
          {board.name}
        </AxisLI>
      );
    }
  });

  return (
    <AxesWrapper>
      <AddButton onClick={() => handleAdd(BC, trail)}>Add Axis</AddButton>
      <AxesUL>{axesList}</AxesUL>
      <AxisMenu
        mouse={mouse}
        setMouse={setMouse}
        setMenuTarget={setMenuTarget}
        openEditor={openEditor}
        rename={rename}
        drillAxis={drillAxis}
      />
    </AxesWrapper>
  );
}
