import React, { useContext } from "react";
import styled from "styled-components";
import { BoardsContext, DisplayContext } from "../contexts";
import colorscheme from "../constants/colorscheme";

const TrailBar = styled.div`
  height: 2em;
  display: flex;
  align-content: center;
  background: linear-gradient(
    to right,
    ${colorscheme.secondary},
    ${colorscheme.tertiary}
  );
  box-shadow: 0 0 4px ${colorscheme.secondary};
`;

const TrailNodeText = styled.div`
  display: inline-block;
  color: white;
  font-size: 0.8;
  margin: 5px;
  font-weight: bold;
  vertical-align: middle;
  &:hover {
    text-shadow: 0px 0px 4px ${colorscheme.tertiary};
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
