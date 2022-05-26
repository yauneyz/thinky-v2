import React from "react";
import {
  AuthContextProvider,
  FirebaseContextProvider,
  BoardsContextProvider,
  DisplayContextProvider,
} from "./contexts";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Routes from "./routes";
import "./App.css";

export function App() {
  return (
    <FirebaseContextProvider>
      <AuthContextProvider>
        <BoardsContextProvider>
          <DisplayContextProvider>
            <DndProvider backend={HTML5Backend}>
              <Routes />
            </DndProvider>
          </DisplayContextProvider>
        </BoardsContextProvider>
      </AuthContextProvider>
    </FirebaseContextProvider>
  );
}
