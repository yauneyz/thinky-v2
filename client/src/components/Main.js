import React, { useState, memo, useContext, useEffect } from "react";
import styled from "styled-components";
import TitleBar from "./TitleBar";
import Trail from "./Trail";
import AxesList from "./AxesList";
import Editors from "./EditorsContainer";
import LoadingPage from "./LoadingPage";
import { getBoards } from "../api/boards";
import { AuthContext, BoardsContext, DisplayContext } from "../contexts";
import Saver from "./Saver";
import colorscheme from "../constants/colorscheme";

// Container for the entire app
const AppContainer = memo(styled.div`
  margin: 0;
  background: ${colorscheme.primary};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`);

// Container for everything underneath the trail bar
const Container2 = memo(styled.div`
  display: flex;
  height: 100%;
`);

export default function Main() {
  // Check for authentication
  const { token } = useContext(AuthContext);
  //console.log(token);
  // The application state
  const { tabs, setDisplayState } = useContext(DisplayContext);
  const { boards, setBoards } = useContext(BoardsContext);

  // Make sure we load properly before proceeding
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Get boards data from the server
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getBoards(token);
        const { userOpen, userBoards, userTabs, userTopNode } = data;
        setBoards(userBoards);
        setDisplayState({
          open: userOpen,
          tabs: userTabs,
          topNode: userTopNode,
        });
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    getData();
  }, [token]);

  // useEffect to set loaded to true once we get the data
  useEffect(() => {
    if (tabs && boards.length > 0) {
      setLoaded(true);
    }
  }, [tabs, boards]);

  if (error) {
    return "Error retrieving data from the server";
  }

  if (token === null || !loaded) {
    return <LoadingPage />;
  }

  return (
    <AppContainer>
      <TitleBar />
      <Trail />
      <Container2>
        <AxesList />
        <Editors />
      </Container2>
      <Saver />
    </AppContainer>
  );
}
