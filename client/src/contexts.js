import React, { useState, useContext, useEffect, useReducer } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import displayReducer from "./reducers/displayReducer";
import boardReducer from "./reducers/boardReducer";
// Track boards

const BoardsContext = React.createContext({ boards: [], setBoards: () => {} });

const BoardsContextProvider = ({ children }) => {
  const initialState = {
    boards: [],
    setBoards: () => {},
  };
  const [state, dispatch] = useReducer(boardReducer, initialState);

  const getNodeTree = (topNode) => {
    const result = [];
    const topBoard = state.boards.find((board) => board.id === topNode);
    const stack = [[topBoard, 0]];
    while (stack.length > 0) {
      const currentNode = stack.pop();
      result.push(currentNode);
      const children = state.boards.filter(
        (board) => board.parentId === currentNode[0].id
      );
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push([children[i], currentNode[1] + 1]);
      }
    }
    return result;
  };

  const getChildren = (id) => {
    const result = [];
    const stack = state.boards.filter((board) => board.parentId === id);
    while (stack.length > 0) {
      const childId = stack.pop();
      const newChildren = state.boards.filter(
        (board) => board.parentId === childId
      );
      result.push(childId);
      stack.push(...newChildren);
    }
    return result;
  };

  const boardsValue = {
    boards: state.boards,
    setBoards: (boards) => dispatch({ type: "SET_BOARDS", boards }),
    addBoard: (board) => dispatch({ type: "ADD_BOARD", board }),
    deleteBoard: (id) => dispatch({ type: "DELETE_BOARD", id }),
    setBoardText: (id, text) => dispatch({ type: "SET_BOARD_TEXT", id, text }),
    renameBoard: (id, title) =>
      dispatch({ type: "SET_BOARD_TITLE", id, title }),
    toggleExpanded: (id) => dispatch({ type: "TOGGLE_EXPANDED", id }),
    collapseAll: () => dispatch({ type: "COLLAPSE_ALL" }),
    expandAll: () => dispatch({ type: "EXPAND_ALL" }),
    setParent: (id, parentId) => dispatch({ type: "MOVE_BOARD", id, parentId }),
    getBoard: (id) => state.boards.find((board) => board.id === id),
    moveBoard: (id, parentId) => dispatch({ type: "MOVE_BOARD", id, parentId }),
    reorderBoards: (drag, drop, dragIndex, dropIndex) =>
      dispatch({ type: "REORDER_BOARDS", drag, drop, dragIndex, dropIndex }),
    isChild: (drag, drop) => {
      if (drag === drop) {
        return true;
      }
      const nodeTree = getNodeTree(drag);
      return !!nodeTree.find((node) => node[0].id === drop);
    },
    getNodeTree,
    getChildren,
  };

  return (
    <BoardsContext.Provider value={boardsValue}>
      {children}
    </BoardsContext.Provider>
  );
};
// Track which boards are open

const DisplayContext = React.createContext({
  open: [],
  setOpen: () => {},
  trail: [],
  setTrail: () => {},
  tabs: [],
  setTabs: () => {},
  topNode: "ROOT",
  setTopNode: () => {},
  highlightTarget: [],
  setHighlightTarget: () => {},
});

const DisplayContextProvider = ({ children }) => {
  const initialState = {
    open: 0,
    trail: [],
    tabs: [],
    topNode: "ROOT",
    highlightTarget: [],
  };
  const [state, dispatch] = useReducer(displayReducer, initialState);
  const displayValue = {
    // The states and setState functions
    open: state.open,
    setOpen: (open) => dispatch({ type: "SET_OPEN", open }),
    trail: state.trail,
    setTrail: (trail) => dispatch({ type: "SET_TRAIL", trail }),
    tabs: state.tabs,
    setTabs: (tabs) => dispatch({ type: "SET_TABS", tabs }),
    displayState: state,
    setDisplayState: (state) => dispatch({ type: "SET_STATE", state }),
    topNode: state.topNode,
    setTopNode: (topNode) => dispatch({ type: "SET_TOP_NODE", topNode }),
    highlightTarget: state.highlightTarget,
    setHighlightTarget: (highlightTarget) =>
      dispatch({ type: "SET_HIGHLIGHT_TARGET", highlightTarget }),

    // Custom actions
    openEditor: (coord) => dispatch({ type: "OPEN_EDITOR", coord }),
    closeEditor: (id) => dispatch({ type: "CLOSE_EDITOR", id }),
    closeEditors: (ids) => dispatch({ type: "CLOSE_EDITORS", ids }),
    addTab: (tab) => dispatch({ type: "ADD_TAB", tab }),
    deleteTab: (tab) => dispatch({ type: "DELETE_TAB", tab }),
    renameTab: (index, name) => dispatch({ type: "RENAME_TAB", index, name }),
    moveTab: (dragIndex, hoverIndex) =>
      dispatch({ type: "MOVE_TAB", dragIndex, hoverIndex }),
    moveEditor: (dragIndex, hoverIndex) =>
      dispatch({ type: "MOVE_EDITOR", dragIndex, hoverIndex }),
  };
  return (
    <DisplayContext.Provider value={displayValue}>
      {children}
    </DisplayContext.Provider>
  );
};

// Authentication
const AuthContext = React.createContext({
  auth: false,
  setAuth: () => {},
  token: null,
  setToken: () => {},
});

const AuthContextProvider = ({ children }) => {
  const { Auth } = useContext(FirebaseContext);
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const value = { auth, setAuth, token, setToken };
  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      if (user) {
        window.localStorage.setItem("auth", "true");
        setAuth(true);
        user.getIdToken().then((token) => {
          window.localStorage.setItem("token", token);
          setToken(token);
        });
      } else {
        setToken(null);
        window.localStorage.setItem("token", "");
        setAuth(false);
        window.localStorage.setItem("auth", "false");
      }
    });
  });
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Firebase
const FirebaseContext = React.createContext({
  Auth: null,
});

const FirebaseContextProvider = ({ children }) => {
  const firebaseConfig = {
    apiKey: "AIzaSyB0jlad9yj7rHR43v0hQtJTqdzjBio6OsA",
    authDomain: "idea-editor.firebaseapp.com",
    projectId: "idea-editor",
    storageBucket: "idea-editor.appspot.com",
    messagingSenderId: "452434726001",
    appId: "1:452434726001:web:078539a5bf309268105fd0",
    measurementId: "G-YGMT87FKCY",
  };

  // Initialize Firebase

  const app = initializeApp(firebaseConfig);
  const Auth = getAuth(app);
  const value = { Auth };
  return (
    <FirebaseContext.Provider value={value}>
      {" "}
      {children}
    </FirebaseContext.Provider>
  );
};

export {
  AuthContext,
  AuthContextProvider,
  FirebaseContext,
  FirebaseContextProvider,
  BoardsContext,
  BoardsContextProvider,
  DisplayContext,
  DisplayContextProvider,
};
