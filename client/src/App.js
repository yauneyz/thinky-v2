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
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import "react-sortable-tree/style.css";

export function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
