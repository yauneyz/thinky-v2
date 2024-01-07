import React, { useContext, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BoardsContext, DisplayContext } from "../contexts";
import styled from "styled-components";
import arrayEquals from "array-equal";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../constants/itemTypes";
import TabBar from "./TabBar";
import colorscheme from "../constants/colorscheme";
import fonts from "../constants/fonts";

// Styled component with column flex layout
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
`;

const EditorsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: ${colorscheme.textBackground};
`;

const EditorText = styled.textarea`
  width: 100%;
  height: calc(100% - 24px);
  box-sizing: border-box;
  margin: 0;
  border-radius: 4px;
  font-family: ${fonts.body};
  font-size: 14px;
  padding: 8px;
  background: ${colorscheme.textBackground};
  color: ${colorscheme.text};
  &:focus {
    outline: none;
    border: 1px solid ${colorscheme.secondary};
    box-shadow: 0 0 8px ${colorscheme.secondary};
  }
`;

const EditorTitleBar = styled.div`
  display: flex;
  justify-content: center;
  height: 1.5em;
  background-color: ${colorscheme.secondary};
`;

const EditorTitle = styled.div`
  margin: auto;
  color: white;
  font-family: ${fonts.heading};
`;

const DeleteButton = styled.button`
  margin-left: auto;
  margin-right: 10px;
  height: 1rem;
  width: 1rem;
  margin-top: auto;
  margin-bottom: auto;
  padding: 0;
  line-height: 0.5rem;
  border: none;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
    background: ${colorscheme.red};
    color: white;
  }
`;

function EditorBase({ className, children, boardId, index }) {
  // Handles the local text changes so we don't have to update global boards that often
  // Gets its initial data from boards, but then manage it locally
  const { getBoard, setBoardText } = useContext(BoardsContext);
  const board = getBoard(boardId);
  const { closeEditor } = useContext(DisplayContext);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setBoardText(boardId, newText);
  };

  // Drag and drop
  const ref = useRef(null);
  const { moveEditor } = useContext(DisplayContext);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.EDITOR,
    collect(monitor) {
      return {
        handlerId: monitor.handlerId,
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveEditor(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.EDITOR,
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));
  const opacity = isDragging ? 0.5 : 1;

  return (
    <div style={{ opacity }} className={className}>
      <EditorTitleBar ref={ref}>
        <EditorTitle>{board.title}</EditorTitle>
        <DeleteButton onClick={() => closeEditor(boardId)}>x</DeleteButton>
      </EditorTitleBar>
      <EditorText
        value={board.text}
        onChange={(event) => handleTextChange(event)}
      >
        {children}
      </EditorText>
    </div>
  );
}

const Editor = styled(EditorBase)`
  flex: 1;
  min-width: 25em;
`;

function EditorsList({ className }) {
  const { open, tabs } = useContext(DisplayContext);
  // If current tab has no editors, return empty div
  if (tabs.length === 0) {
    return <div className={className}></div>;
  }

  const effectiveOpen = Math.max(Math.min(open, tabs.length - 1), 0);
  const editorsList = tabs[effectiveOpen].editors.map((id, index) => {
    return <Editor key={id} boardId={id} index={index} />;
  });
  return editorsList;
}

export default function Editors() {
  return (
    <Container>
      <TabBar />
      <EditorsContainer>
        <EditorsList />
      </EditorsContainer>
    </Container>
  );
}
