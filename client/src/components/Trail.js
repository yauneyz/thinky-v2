import React, { useContext } from "react";
import styled from "styled-components";
import { DisplayContext } from "../contexts";

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

function TrailNodeList({ trail, setTrail, BC }) {
  let currentBoard = BC.getBoard([]);
  let trailBoards = [currentBoard];
  for (const i of trail) {
    currentBoard = currentBoard.children[i];
    trailBoards.push(currentBoard);
  }
  return trailBoards.map((board, index) => (
    <TrailNode
      key={index}
      name={board.name}
      clickHandler={(_event) => backtrackTrail(index, trail, setTrail)}
    />
  ));
}

function backtrackTrail(index, trail, setTrail) {
  setTrail(trail.slice(0, index));
}

export default function Trail({ BC }) {
  const { trail, setTrail } = useContext(DisplayContext);
  return (
    <TrailBar>
      <TrailNodeList trail={trail} setTrail={setTrail} BC={BC} />
    </TrailBar>
  );
}
