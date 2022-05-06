import React, { useContext, useEffect } from "react";
import { AuthContext, DisplayContext } from "../contexts";

export default function Saver({ BC }) {
  const { open, trail, tabs } = useContext(DisplayContext);
  const { token } = useContext(AuthContext);

  const saveSeconds = 2;

  useEffect(() => {
    const interval = setInterval(() => {
      const boards = BC.getBoard([]);
      fetch("/boards", {
        method: "POST",
        body: JSON.stringify({ open, trail, boards, tabs }),
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
