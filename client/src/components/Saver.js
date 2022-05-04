import React, { useContext, useEffect } from "react";
import { AuthContext, OpenContext, TrailContext } from "../contexts";

export default function Saver({ BC }) {
  const { open } = useContext(OpenContext);
  const { trail } = useContext(TrailContext);
  const { token } = useContext(AuthContext);

  const saveSeconds = 2;

  useEffect(() => {
    const interval = setInterval(() => {
      const boards = BC.getBoard([]);
      fetch("/boards", {
        method: "POST",
        body: JSON.stringify({ open, trail, boards }),
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
