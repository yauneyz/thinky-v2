import React, { useRef, useContext, useState } from "react";
import { BoardsContext, DisplayContext } from "../contexts";
import styled from "styled-components";
import { produce } from "immer";
import { TextField, ClickAwayListener } from "@mui/material";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../constants/itemTypes";
import AxisNode from "./AxisNode";
import UndoPanel from "./UndoPanel";
import NewBoard from "../utils/NewBoard";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faMinimize,
  faExpand,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const AxesWrapper = styled.div`
  width: 14em;
  border-right: 5px solid #910101;
  justify-content: start;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

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
  const { topNode, setTopNode, setHighlightTarget } =
    useContext(DisplayContext);
  const { addBoard, moveBoard, getBoard, collapseAll, expandAll, getNodeTree } =
    useContext(BoardsContext);
  const topBoard = getBoard(topNode);

  const zoomIn = (id) => {
    setTopNode(id);
  };

  const zoomOut = () => {
    setTopNode(topBoard.parentId);
  };

  const addTopLevelBoard = () => {
    const newBoard = NewBoard();
    newBoard.parentId = "ROOT";
    setHighlightTarget(newBoard.id);
    addBoard(newBoard);
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

  // Drop target to allow dragging to root level
  const ref = useRef(null);

  const [{ validDrop }, drop] = useDrop({
    accept: ItemTypes.BOARD,
    collect: (monitor) => ({
      validDrop: monitor.canDrop() && monitor.isOver({ shallow: true }),
    }),
    // can drop if the item is not one of the board's children
    canDrop: (item, _monitor) => {
      return item.parentId !== "ROOT";
    },
    drop: (item, monitor) => {
      debugger;
      if (!monitor.isOver({ shallow: true }) || monitor.didDrop()) {
        return;
      }
      const dragId = item.id;
      moveBoard(dragId, "ROOT");
    },
  });

  drop(ref);

  let backgroundColor = validDrop ? "green" : "transparent";

  // Generate the list of axes
  return (
    <AxesWrapper ref={ref} style={{ backgroundColor }}>
      <AxesListMenu>
        <AxesMenuButton onClick={zoomOut}>
          <Icon icon={faArrowUp} size="lg" inverse />
        </AxesMenuButton>
        <AxesMenuButton onClick={expandAll}>
          <Icon icon={faExpand} size="lg" inverse />
        </AxesMenuButton>
        <AxesMenuButton onClick={collapseAll}>
          <Icon icon={faMinimize} size="lg" inverse />
        </AxesMenuButton>
        <UndoPanel />
        <AxesMenuButton onClick={addTopLevelBoard}>
          <Icon icon={faPlus} size="lg" inverse />
        </AxesMenuButton>
      </AxesListMenu>
      {axes}
    </AxesWrapper>
  );
}
