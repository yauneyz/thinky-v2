import React, { useContext, useState } from "react";
import styled from "styled-components";
import { DisplayContext } from "../contexts";
import NewBoard from "../utils/NewBoard";
import TransparentButton from "../utils/TransparentButton";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
// Import small plus
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function ArrowBase({ className, toggleExpanded }) {
  return <div className={className} onClick={toggleExpanded}></div>;
}

const Arrow = styled(ArrowBase)`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  margin-right: 0.3rem;
  border-color: white;
  transform: rotate(${({ expanded }) => (expanded ? -45 : 45)}deg);
  transition: transform 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: rotate(${({ expanded }) => (expanded ? -45 : 45)}deg);
    box-shadow: 0 0 0 1px red;
  }
`;

const AxisTitle = styled.span`
  display: inline-block;
  color: white;
  cursor: pointer;
  margin-right: 1rem;
  &:hover {
    color: #0066ff;
  }
`;

const AxisNodeContainer = styled.div`
  // Margin based on the indent prop
  margin-left: ${({ indent }) => 0.2 + indent * 0.5}rem;
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
  const { openEditor } = useContext(DisplayContext);

  const handleToggle = () => {
    BC.toggleExpanded(coord);
  };

  // Button with a "+" icon for adding a new axis on click
  const AddButton = () => {
    return (
      <TransparentButton
        className="btn btn-sm btn-outline-primary"
        onClick={() => {
          BC.addChild(coord, NewBoard);
        }}
      >
        <Icon icon={faPlus} size="s" inverse />
      </TransparentButton>
    );
  };

  return (
    <div>
      {/* Display the axis itself */}

      <AxisNodeContainer indent={indent}>
        <Arrow expanded={board.expanded} toggleExpanded={handleToggle} />
        <AxisTitle
          onDoubleClick={() => {
            console.log("Open");
            openEditor(coord);
          }}
        >
          {board.name}
        </AxisTitle>
        <AddButton />
      </AxisNodeContainer>

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
