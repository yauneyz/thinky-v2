import React, { useState } from "react";

// Track which boards are open

const OpenContext = React.createContext({ open: [], setOpen: () => {} });

const OpenContextProvider = ({ children }) => {
  const [open, setOpen] = useState([]);
  const openValue = { open, setOpen };
  return (
    <OpenContext.Provider value={openValue}>{children}</OpenContext.Provider>
  );
};

// Track the trail

const TrailContext = React.createContext({ trail: [], setTrail: () => {} });

const TrailContextProvider = ({ children }) => {
  const [trail, setTrail] = useState([]);
  const trailValue = { trail, setTrail };
  return (
    <TrailContext.Provider value={trailValue}>{children}</TrailContext.Provider>
  );
};

export { TrailContextProvider, TrailContext, OpenContextProvider, OpenContext };
