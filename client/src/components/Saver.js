import React, { useContext, useEffect } from "react";
import { AuthContext, OpenContext, TrailContext } from "../contexts";

export default function Saver({ BC }) {
  const { open } = useContext(OpenContext);
  const { trail } = useContext(TrailContext);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const boards = BC.getBoard([]);

    const interval = setInterval(() => {
      console.log("Boards Length: ", boards.children.length);
      fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ open, trail, boards }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return () => clearInterval(interval);
    }, 10000);
  });
  return <div></div>;
}
