import React from "react";
import {
  AuthContextProvider,
  FirebaseContextProvider,
  BoardsContextProvider,
  DisplayContextProvider,
} from "./contexts";
import Routes from "./routes";
import "./App.css";

export function App() {
  return (
    <FirebaseContextProvider>
      <AuthContextProvider>
        <BoardsContextProvider>
          <DisplayContextProvider>
            <Routes />
          </DisplayContextProvider>
        </BoardsContextProvider>
      </AuthContextProvider>
    </FirebaseContextProvider>
  );
}
