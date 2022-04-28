import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OpenContext } from "../contexts";
import styled from "styled-components";
import arrayEquals from "array-equal";

const EditorsContainer = styled.div`
  width: 100%;
  display: flex;
`;

const EditorText = styled.textarea`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const EditorTitleBar = styled.div`
  display: flex;
  justify-content: center;
`;

const EditorTitle = styled.div`
  margin: auto;
  color: white;
`;

const DeleteButton = styled.button`
  margin-left: auto;
  margin-right: 10px;
`;

function handleTextChange(event, coord, BC, setText) {
  const newText = event.target.value;
  // Update the local text
  setText(newText);

  // Send the changes back to the main boards, but don't trigger page-wide rerender
  BC.setBoardText(coord, newText);
}

function EditorBase({ className, children, coord, board, BC }) {
  // Handles the local text changes so we don't have to update global boards that often
  // Gets its initial data from boards, but then manage it locally
  const [text, setText] = useState(board.text);
  const { open, setOpen } = useContext(OpenContext);
  const deleteEditor = () => {
    setOpen(open.filter((arrCoord) => !arrayEquals(arrCoord, coord)));
  };
  return (
    <div className={className}>
      <EditorTitleBar>
        <EditorTitle>{board.name}</EditorTitle>
        <DeleteButton onClick={deleteEditor}>X</DeleteButton>
      </EditorTitleBar>
      <EditorText
        value={text}
        onChange={(event) => handleTextChange(event, coord, BC, setText)}
      >
        {children}
      </EditorText>
    </div>
  );
}
const Editor = styled(EditorBase)`
  flex: 1;
`;

function EditorsList({ BC }) {
  const { open } = useContext(OpenContext);
  const editorsList = open.map((coord, index) => {
    // The board this one is referring to
    const board = BC.getBoard(coord);
    return <Editor key={index} coord={coord} board={board} BC={BC} />;
  });
  return editorsList;
}

export default function Editors({ BC }) {
  return (
    <EditorsContainer>
      <EditorsList BC={BC} />
    </EditorsContainer>
  );
}
