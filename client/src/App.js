import React from "react";
import {
  TrailContextProvider,
  OpenContextProvider,
  AuthContextProvider,
  FirebaseContextProvider,
  BoardsContextProvider,
} from "./contexts";
import Routes from "./routes";
import "./App.css";

export function App() {
  return (
    <FirebaseContextProvider>
      <AuthContextProvider>
        <BoardsContextProvider>
          <OpenContextProvider>
            <TrailContextProvider>
              <Routes />
            </TrailContextProvider>
          </OpenContextProvider>
        </BoardsContextProvider>
      </AuthContextProvider>
    </FirebaseContextProvider>
  );
}
