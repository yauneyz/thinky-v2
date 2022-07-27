import React, { useContext } from "react";
import styled from "styled-components";
import { BoardsContext, DisplayContext } from "../contexts";

const TrailBar = styled.div`
  height: 3em;
  background-color: #910101;
  display: flex;
  align-content: center;
`;

const TrailNodeText = styled.div`
  display: inline-block;
  color: white;
  font-size: 0.8;
  margin: 5px;
  font-weight: bold;
  vertical-align: middle;
  &:hover {
    text-shadow: 0px 0px 4px red;
  }
  &:after {
    content: " >";
  }
`;

function TrailNode({ name, clickHandler }) {
  return <TrailNodeText onClick={clickHandler}>{name}</TrailNodeText>;
}

function TrailNodeList({ terminalNode, setTrail }) {
  const { getBoard, boards } = useContext(BoardsContext);
  let currentBoard = getBoard(terminalNode);
  let trailBoards = [currentBoard];
  while (currentBoard.id !== "ROOT") {
    currentBoard = getBoard(currentBoard.parentId);
    trailBoards.push(currentBoard);
  }
  trailBoards.reverse();
  return trailBoards.map((board, index) => (
    <TrailNode
      key={index}
      name={board.title}
      clickHandler={() => setTrail(board.id)}
    />
  ));
}

export default function Trail() {
  const { topNode, setTopNode } = useContext(DisplayContext);
  return (
    <TrailBar>
      <TrailNodeList terminalNode={topNode} setTrail={setTopNode} />
    </TrailBar>
  );
}
