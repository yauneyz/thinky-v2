import React, { useState } from "react";
import { Menu, MenuItem, ClickAwayListener } from "@mui/material";

export default function AxisMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mouse, setMouse] = useState({ X: null, Y: null });
  const handleClose = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <Menu
        open={menuOpen}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          mouse.Y !== null && mouse.X !== null
            ? { top: mouse.Y, left: mouse.X }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>Open</MenuItem>
        <MenuItem onClick={handleClose}>Expand</MenuItem>
        <MenuItem onClick={handleClose}>Rename</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
