import React, { useState, memo, useContext, useEffect } from "react";
import styled from "styled-components";
import TitleBar from "./TitleBar";
import Trail from "./Trail";
import AxesList from "./AxesList";
import Editors from "./EditorsContainer";
import BoardsController from "../utils/BoardsController";
import { getBoards } from "../api/boards";
import { AuthContext, BoardsContext, DisplayContext } from "../contexts";
import Saver from "./Saver";

// Container for the entire app
const AppContainer = memo(styled.div`
  margin: 0;
  background: #2b2929;
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

  const BC = new BoardsController(boards, setBoards);

  // Get boards data from the server
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getBoards(token);
        const { userOpen, userTrail, userBoards, userTabs, userTopNode } = data;
        setBoards(userBoards);
        setDisplayState({
          open: userOpen,
          trail: userTrail,
          tabs: userTabs,
          topNode: userTopNode,
        });
      } catch (error) {
        setError(true);
      }
    };
    getData();
  }, []);

  // useEffect to set loaded to true once we get the data
  useEffect(() => {
    if (tabs && boards) {
      setLoaded(true);
    }
  }, [tabs, boards]);

  if (error) {
    return "Error retrieving data from the server";
  }

  if (!loaded) {
    return "Loading";
  }

  return (
    <AppContainer>
      <TitleBar />
      <Trail BC={BC} />
      <Container2>
        <AxesList BC={BC} />
        <Editors BC={BC} />
      </Container2>
      <Saver BC={BC} />)
    </AppContainer>
  );
}
