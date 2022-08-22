import React, { useContext, useEffect } from "react";
import { AuthContext, BoardsContext, DisplayContext } from "../contexts";

export default function Saver() {
  const { open, tabs, topNode } = useContext(DisplayContext);
  const { token } = useContext(AuthContext);
  const { boards } = useContext(BoardsContext);

  const saveSeconds = 2;

  const save = () => {
    fetch("/boards", {
      method: "POST",
      body: JSON.stringify({ open, boards, tabs, topNode }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  };

  // If the user inputs crtl + s, then save the file.
  const handleKeySave = (event) => {
    console.log(event.keyCode);
    if (event.ctrlKey && event.keyCode === 83) {
      event.preventDefault();
      save();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/boards", {
        method: "POST",
        body: JSON.stringify({ open, boards, tabs, topNode }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    }, saveSeconds * 1000);
    return () => clearInterval(interval);
  });
  return <div onKeyDown={handleKeySave}></div>;
}
