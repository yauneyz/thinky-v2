import React, { useState, memo, useContext, useEffect } from "react";
import styled from "styled-components";
import { useQuery, useQueryClient } from "react-query";
import TitleBar from "./TitleBar";
import Trail from "./Trail";
import AxesList from "./AxesList";
import Editors from "./EditorsContainer";
import BoardsController from "../utils/BoardsController";
import { getBoards } from "../api/boards";
import {
  AuthContext,
  BoardsContext,
  OpenContext,
  TrailContext,
} from "../contexts";
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
  const { token } = useContext(AuthContext);

  // We don't want to load data until we get the token
  const { setOpen } = useContext(OpenContext);
  const { setTrail } = useContext(TrailContext);
  const { boards, setBoards } = useContext(BoardsContext);
  const [loaded, setLoaded] = useState(false);
  const [rendered, setRendered] = useState(false);
  const BC = new BoardsController(boards, setBoards, useQueryClient());
  const [appData, setAppData] = useState(null);
  // Get boards data from the server
  const { isLoading, isError, data } = useQuery("boards", () =>
    getBoards(token)
  );
  useEffect(() => {
    if (!isLoading) {
      const { userBoards, userOpen, userTrail } = appData;
      setOpen(userOpen);
      setTrail(userTrail);
      setBoards(userBoards);
      console.log("UB", appData);
      setRendered(true);
    }
  }, [isLoading]);

  if (isLoading || !rendered) {
    return "Loading";
  }
  if (isError) {
    return "Error retrieving data from the server";
  }
  if (!loaded) {
    setLoaded(true);
    setAppData(data);
  }
  console.log("Boards", boards);

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
