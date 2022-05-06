import React, { useState, useContext, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Track boards

const BoardsContext = React.createContext({ boards: [], setBoards: () => {} });

const BoardsContextProvider = ({ children }) => {
  const [boards, setBoards] = useState(null);
  const boardsValue = { boards, setBoards };
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
});

const DisplayContextProvider = ({ children }) => {
  const [open, setOpen] = useState(0);
  const [trail, setTrail] = useState([]);
  const [tabs, setTabs] = useState([]);
  const displayValue = { open, setOpen, trail, setTrail, tabs, setTabs };
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
