import React, { useContext, useState } from "react";
import { BoardsContext, DisplayContext } from "../contexts";
import styled from "styled-components";
import { produce } from "immer";
import { TextField, ClickAwayListener } from "@mui/material";
import AxisNode from "./AxisNode";
import UndoPanel from "./UndoPanel";
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

function menuOpen(event, index, setMouse, setMenuTarget) {
  event.preventDefault();
  setMouse({ X: event.clientX - 2, Y: event.clientY - 4 });
  setMenuTarget(index);
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

export default function AxesList() {
  const [selected, setSetlected] = useState(null);
  const { topNode, setTopNode } = useContext(DisplayContext);
  const { getBoard, collapseAll, expandAll, getNodeTree } =
    useContext(BoardsContext);
  const topBoard = getBoard(topNode);

  const zoomIn = (id) => {
    setTopNode(id);
  };

  const zoomOut = () => {
    setTopNode(topBoard.parentId);
  };

  const nodeTree = getNodeTree(topNode);
  const axes = nodeTree.map((nodePair, index) => {
    const node = nodePair[0];
    const indent = nodePair[1];
    return (
      <AxisNode
        key={index}
        selected={selected}
        setSetlected={setSetlected}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        board={node}
        indent={indent}
      />
    );
  });

  // Generate the list of axes
  return (
    <AxesWrapper>
      <AxesListMenu>
        <AxesMenuButton onClick={zoomOut}>
          <Icon icon={faArrowUp} size="lg" inverse />
        </AxesMenuButton>
        <AxesMenuButton onClick={collapseAll}>
          <Icon icon={faMinimize} size="lg" inverse />
        </AxesMenuButton>
        <AxesMenuButton onClick={expandAll}>
          <Icon icon={faExpand} size="lg" inverse />
        </AxesMenuButton>
        <UndoPanel />
      </AxesListMenu>
      {axes}
    </AxesWrapper>
  );
}
