import React, { useContext, useState } from "react";
import styled from "styled-components";
import { DisplayContext } from "../contexts";
import NewBoard from "../utils/NewBoard";
import arrayEqual from "array-equal";
import TransparentButton from "../utils/TransparentButton";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuItem, ClickAwayListener } from "@mui/material";

function ArrowBase({ className, toggleExpanded }) {
  return <div className={className} onClick={toggleExpanded}></div>;
}

const Arrow = styled(ArrowBase)`
  width: 7px;
  height: 7px;
  margin: 3.5px;
  background: #ff0000;
  display: inline-block;
  padding: 3px;
  float: left;
  margin-right: 0.5rem;
  transform: rotate(${({ expanded }) => (expanded ? 225 : 135)}deg);
  transition: transform 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: rotate(${({ expanded }) => (expanded ? 225 : 135)}deg);
    box-shadow: 0 0 0 1px red;
  }
  &:after {
    content: "";
    position: absolute;
    left: 2px;
    top: 2px;
    width: 7px;
    height: 7px;
    background: white;
  }
`;

const AxisTitle = styled.span`
  display: inline-block;
  color: white;
  cursor: pointer;
  &:hover {
    color: #0066ff;
  }
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 8em;
`;

const AxisNodeContainer = styled.div`
  // Margin based on the indent prop
  margin: 0 0 0 ${({ indent }) => 0.2 + indent * 0.5}rem;
  padding: 0;
  display: flex;
`;

const RenameInput = styled.input`
  border: none;
  background: transparent;
  color: white;
  display: inline-block;
  padding: 0;
  margin: 0;
  outline: none;
  &:focus {
    outline: none;
  }
  font: inherit;
`;

const AxisNodeBase = ({
  board,
  selected,
  setSelected,
  zoomIn,
  zoomOut,
  zoomOutAll,
  indent,
  coord,
  BC,
}) => {
  const [hover, setHover] = useState(false);
  const [editable, setEditable] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mouse, setMouse] = useState({ X: null, Y: null });
  const { openEditor, deleteAxis, highlightTarget, setHighlightTarget } =
    useContext(DisplayContext);

  const newHighlight = highlightTarget
    ? arrayEqual(coord, highlightTarget)
    : false;

  const effectiveEditable = editable || newHighlight;

  const handleToggle = () => {
    BC.toggleExpanded(coord);
  };

  const renameHandleKeyDown = (e) => {
    // Escape rename editing
    if (effectiveEditable && (e.key === "Enter" || e.key === "Escape")) {
      setEditable(false);
    }
  };

  const treeKeyCommands = (e) => {
    // All the tree commands
    if (hover) {
      // Zoom in
      if (e.key === "z") {
        zoomIn(coord);
      }

      // Add a new node
      if (e.key === "a") {
        e.preventDefault();
        BC.addChild(coord, NewBoard);
        const childCoord = coord.concat(board.children.length);
        setHighlightTarget(childCoord);
      }

      // Open the editor
      if (e.key === "q") {
        openEditor(coord);
      }
    }
  };

  const NodeMenu = () => {
    const handleClose = () => {
      setMenuOpen(false);
      setMouse({ X: null, Y: null });
    };

    const deleteNode = () => {
      deleteAxis(coord);
      BC.deleteBoard(coord);
      handleClose();
    };

    return (
      <div>
        <Menu
          open={menuOpen}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            mouse.Y !== null && mouse.X !== null
              ? { top: mouse.Y, left: mouse.X }
              : undefined
          }
        >
          <MenuItem onClick={() => BC.collapseBelow(coord)}>
            Collapse Below
          </MenuItem>
          <MenuItem onClick={() => BC.expandBelow(coord)}>
            Expand Below
          </MenuItem>
          {coord.length > 0 && <MenuItem onClick={deleteNode}>Delete</MenuItem>}
        </Menu>
      </div>
    );
  };

  return (
    <div>
      {/* Display the axis itself */}

      <AxisNodeContainer
        indent={indent}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          if (!effectiveEditable) {
            setHover(false);
          }
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setMouse({ X: e.clientX, Y: e.clientY });
          setMenuOpen(true);
        }}
      >
        <Arrow expanded={board.expanded} toggleExpanded={handleToggle} />
        {effectiveEditable ? (
          <RenameInput
            autoFocus
            onFocus={(event) => {
              event.target.select();
            }}
            type="text"
            value={board.name}
            onChange={(e) => {
              BC.renameBoard(coord, e.target.value);
            }}
            onBlur={() => {
              setEditable(false);
              setHover(false);
              if (newHighlight) {
                setHighlightTarget(-1);
              }
            }}
            onKeyDown={renameHandleKeyDown}
          />
        ) : (
          <AxisTitle
            onDoubleClick={() => {
              setEditable(true);
            }}
            tabIndex={0}
            onKeyDown={treeKeyCommands}
          >
            {board.name}
          </AxisTitle>
        )}
      </AxisNodeContainer>
      <NodeMenu />

      {/* The children for this axis */}

      {board.expanded &&
        board.children.map((child, i) => (
          <AxisNode
            key={i}
            board={child}
            selected={selected}
            setSelected={setSelected}
            zoomIn={zoomIn}
            zoomOut={zoomOut}
            zoomOutAll={zoomOutAll}
            indent={indent + 1}
            BC={BC}
            coord={coord.concat(i)}
          />
        ))}
    </div>
  );
};

const AxisNode = styled(AxisNodeBase)``;
export default AxisNode;
