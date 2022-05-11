import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DisplayContext } from "../contexts";
import styled from "styled-components";
import arrayEquals from "array-equal";
import TabBar from "./TabBar";

// Styled component with column flex layout
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const EditorsContainer = styled.div`
  width: 100%;
  height: 100%;
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

function EditorBase({ className, children, coord, BC }) {
  // Handles the local text changes so we don't have to update global boards that often
  // Gets its initial data from boards, but then manage it locally
  const board = BC.getBoard(coord);
  console.log("Board", board);
  console.log("Boards:" + board.name, BC.boards.children);
  const [text, setText] = useState(board.text);
  const { closeEditor } = useContext(DisplayContext);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    BC.setBoardText(coord, newText);
  };

  return (
    <div className={className}>
      <EditorTitleBar>
        <EditorTitle>{board.name}</EditorTitle>
        <DeleteButton onClick={() => closeEditor(coord)}>X</DeleteButton>
      </EditorTitleBar>
      <EditorText value={text} onChange={(event) => handleTextChange(event)}>
        {children}
      </EditorText>
    </div>
  );
}

const Editor = styled(EditorBase)`
  flex: 1;
`;

function EditorsList({ BC, className }) {
  const { open, tabs } = useContext(DisplayContext);
  // If current tab has no editors, return empty div
  if (tabs.length === 0) {
    return <div className={className}></div>;
  }
  console.log("OPEN TABS", tabs[open]);

  const effectiveOpen = Math.min(open, tabs.length - 1);
  const editorsList = tabs[effectiveOpen].editors.map((coord, index) => {
    const key = `${index}${coord.join("-")}`;
    return <Editor key={key} coord={coord} BC={BC} />;
  });
  return editorsList;
}

export default function Editors({ BC }) {
  return (
    <Container>
      <TabBar />
      <EditorsContainer>
        <EditorsList BC={BC} />
      </EditorsContainer>
    </Container>
  );
}
