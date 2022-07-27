import React, { useContext, useEffect } from "react";
import { AuthContext, BoardsContext, DisplayContext } from "../contexts";

export default function Saver() {
  const { open, tabs, topNode } = useContext(DisplayContext);
  const { token } = useContext(AuthContext);
  const { boards } = useContext(BoardsContext);

  const saveSeconds = 2;

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
  return <div></div>;
}
