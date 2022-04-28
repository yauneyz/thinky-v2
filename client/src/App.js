import React, { useState, memo } from "react";
import TitleBar from "./components/TitleBar";
import Trail from "./components/Trail";
import AxesList from "./components/AxesList";
import Editors from "./components/EditorsContainer";
import BoardsController from "./utils/BoardsController";
import { getBoards } from "./api/boards";
import styled from "styled-components";
import { TrailContextProvider, OpenContextProvider } from "./contexts";
import {
  useQuery,
  QueryClient,
  useQueryClient,
  QueryClientProvider,
} from "react-query";
import "./App.css";

const queryClient = new QueryClient();

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

export function App() {
  // Get boards data from the server
  var { isLoading, error, data } = useQuery("boards", getBoards);

  if (typeof data === "undefined") {
    data = { name: "Home", children: [], text: "" };
  }

  // Track the state of the boards
  const [boards, setBoards] = useState(data);
  const BC = new BoardsController(boards, setBoards, queryClient);

  if (isLoading) {
    return "Loading";
  }
  if (error) {
    return "Unable to connect to server";
  }

  return (
    <QueryClientProvider client={queryClient}>
      <OpenContextProvider>
        <TrailContextProvider>
          <AppContainer>
            <TitleBar />
            <Trail BC={BC} />
            <Container2>
              <AxesList BC={BC} />
              <Editors BC={BC} />
            </Container2>
          </AppContainer>
        </TrailContextProvider>
      </OpenContextProvider>
    </QueryClientProvider>
  );
}
