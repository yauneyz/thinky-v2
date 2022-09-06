import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { AuthContext, BoardsContext, DisplayContext } from "../contexts";
import Tooltip from "@mui/material/Tooltip";
import NewBoard from "../utils/NewBoard";
import { Menu, MenuItem } from "@mui/material";
import { deleteBoardRequest } from "../api/undo";
import { useMutation, useQueryClient } from "react-query";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../constants/itemTypes";
import { ArrowColors } from "../constants/colors";
import colorscheme from "../constants/colorscheme";
import fonts from "../constants/fonts";
import { Parser as HtmlToReactParser } from "html-to-react";

// Formats the input text as html for the tooltip
// Only keep the first 20 lines
function formatBoardHTML(title, text) {
  let titleElement;
  titleElement =
    "<h3 style='border-bottom: 1px solid white'>" + title + "</h3>";
  const lines = text.split("\n");
  const body = lines.slice(0, 20).join("<br />");
  const html = `${titleElement}${body}`;
  return html;
}

function ArrowBase({ className, toggleExpanded }) {
  return <div className={className} onClick={toggleExpanded}></div>;
}

const Arrow = styled(ArrowBase)`
  width: 0;
  height: 0;
  border-top: ${(props) => {
    const colorString = "5px solid " + props.color;
    return props.expanded && props.hasChildren
      ? colorString
      : "5px solid transparent";
  }};

  border-left: ${(props) => {
    const colorString = "5px solid " + props.color;
    return props.expanded || !props.hasChildren
      ? "5px solid transparent"
      : colorString;
  }};
  border-right: ${(props) =>
    props.expanded || !props.hasChildren
      ? "5px solid transparent"
      : "5px solid transparent"};
  border-bottom: ${(props) =>
    props.expanded ? "5px solid transparent" : "5px solid transparent"};
  margin-top: ${(props) => (props.expanded ? "8px" : "6px")};
  margin-left: ${(props) =>
    props.expanded && props.hasChildren ? "0" : "2.5px"};
  margin-right: 3px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const AxisTitle = styled.span`
  display: inline-block;
  color: ${colorscheme.contrastText};
  cursor: pointer;
  &:hover {
    color: ${colorscheme.secondary};
  }
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 8em;
  font-family: ${fonts.heading};
`;

const AxisNodeContainer = styled.div`
  // Margin based on the indent prop
  margin: 0 0 0 ${({ indent }) => 0.2 + indent * 0.5}rem;
  padding: 0;
  display: flex;
  transition: all 0.2s ease-in-out;
`;

const RenameInput = styled.input`
  border: none;
  background: transparent;
  color: ${colorscheme.contrastText};
  display: inline-block;
  padding: 0;
  margin: 0;
  outline: none;
  &:focus {
    outline: none;
  }
  font: inherit;
`;

const AxisNodeBase = ({
  board,
  selected,
  setSelected,
  zoomIn,
  zoomOut,
  zoomOutAll,
  indent,
}) => {
  const { id } = board;
  const { token } = useContext(AuthContext);
  const {
    boards,
    addBoard,
    deleteBoard,
    toggleExpanded,
    collapseBelow,
    expandBelow,
    isChild,
    moveBoard,
    renameBoard,
    reorderBoards,
    getChildren,
    getDescendantIds,
  } = useContext(BoardsContext);
  const [hover, setHover] = useState(false);
  const [editable, setEditable] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mouse, setMouse] = useState({ X: null, Y: null });
  const {
    openEditor,
    closeEditors,
    highlightTarget,
    setHighlightTarget,
    addTab,
  } = useContext(DisplayContext);

  const queryClient = useQueryClient();
  const htmlParser = new HtmlToReactParser();
  const deleteAxisMutation = useMutation(
    (data) => {
      return deleteBoardRequest(data);
    },
    {
      onSuccess: () => {
        // Invalidate the cache for the deleted tab
        queryClient.invalidateQueries();
      },
    }
  );

  const newHighlight = highlightTarget === id;

  const effectiveEditable = editable || newHighlight;

  const handleToggle = () => {
    toggleExpanded(id);
  };

  const renameHandleKeyDown = (e) => {
    // Escape rename editing
    if (effectiveEditable && (e.key === "Enter" || e.key === "Escape")) {
      if (newHighlight) {
        setHighlightTarget(null);
      }
      setEditable(false);
    }
  };

  const addChild = () => {
    let newBoard = NewBoard();
    newBoard.parentId = board.id;
    addBoard(newBoard);
    setHighlightTarget(newBoard.id);
    return newBoard;
  };

  const open = (targetBoard) => {
    openEditor(targetBoard.id);
  };

  const treeKeyCommands = (e) => {
    // All the tree commands
    if (hover) {
      // Zoom in
      if (e.key === "z") {
        e.preventDefault();
        zoomIn(id);
      }

      // Add a new node
      if (e.key === "a") {
        e.preventDefault();
        addChild();
      }

      // Add a new node and open it in a new tab
      if (e.key === "A") {
        e.preventDefault();
        const newBoard = addChild();
        open(newBoard);
      }

      // Open the editor
      if (e.key === "q") {
        e.preventDefault();
        open(board);
      }

      // Create a new tab with this node open
      if (e.key === "t") {
        e.preventDefault();
        const newTab = {
          name: board.title,
          editors: [board.id],
        };
        addTab(newTab);
      }

      // Open in a new tab with all its children open
      if (e.key === "w") {
        e.preventDefault();
        const newTab = {
          name: board.title,
          editors: [],
        };
        addTab(newTab);
        getChildren(id).forEach((child) => {
          openEditor(child.id);
        });
      }
    }
  };

  const NodeMenu = () => {
    const handleClose = () => {
      setMenuOpen(false);
      setMouse({ X: null, Y: null });
    };

    const deleteNode = () => {
      const children = [...getDescendantIds(id), board.id];
      closeEditors(children);
      const deletedBoardData = { board, token };
      deleteAxisMutation.mutate(deletedBoardData);
      deleteBoard(id);
      handleClose();
    };

    const handleCollapseBelow = () => {
      collapseBelow(id);
      handleClose();
    };

    const handleExpandBelow = () => {
      expandBelow(id);
      handleClose();
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
          <MenuItem
            onClick={() => {
              addChild();
              handleClose();
            }}
          >
            Add Child
          </MenuItem>
          <MenuItem
            onClick={() => {
              open();
              handleClose();
            }}
          >
            Open
          </MenuItem>
          <MenuItem onClick={deleteNode}>Delete</MenuItem>
          <MenuItem onClick={handleExpandBelow}>Expand Below</MenuItem>
          <MenuItem onClick={handleCollapseBelow}>Collapse Below</MenuItem>
        </Menu>
      </div>
    );
  };

  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOARD,
    item: () => ({
      id: board.id,
      parentId: board.parentId,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{ validDrop, invalidDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.BOARD,
    collect: (monitor) => ({
      validDrop: monitor.canDrop() && monitor.isOver(),
      invalidDrop: !monitor.canDrop() && monitor.isOver(),
      isOver: monitor.isOver({ shallow: true }),
    }),
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragId = item.id;
      const hoverId = board.id;
      const dragIndex = boards.findIndex((board) => board.id === dragId);
      const hoverIndex = boards.findIndex((board) => board.id === hoverId);
      // Don't replace items with themselves
      if (dragId === hoverId || item.parentId !== board.parentId) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      reorderBoards(dragId, hoverId, dragIndex, hoverIndex);
      item.index = hoverId;
    },
    // can drop if the item is not one of the board's children
    canDrop: (item, _monitor) => {
      const dragId = item.id;
      const dropId = board.id;
      const ans = !isChild(dragId, dropId);
      return ans;
    },
    drop: (item, monitor) => {
      if (!monitor.isOver() || monitor.didDrop()) {
        return;
      }
      const dragId = item.id;
      const dropId = board.id;
      moveBoard(dragId, dropId);
    },
  });

  drag(drop(ref));

  // highlight yellow when it is dragging, otherwise transparent
  let highlight = "transparent";
  if (isDragging) {
    highlight = isDragging ? "yellow" : "transparent";
  } else {
    if (validDrop) {
      highlight = "green";
    }
    if (invalidDrop) {
      highlight = "red";
    }
  }
  const opacity = isDragging ? 0.5 : 1;

  const ArrowColor = ArrowColors[indent % ArrowColors.length];

  return (
    <div>
      {/* Display the axis itself */}

      <AxisNodeContainer
        ref={ref}
        style={{ backgroundColor: highlight, opacity }}
        indent={indent}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          if (!effectiveEditable) {
            setHover(false);
          }
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setMouse({ X: e.clientX, Y: e.clientY });
          setMenuOpen(true);
        }}
      >
        <Arrow
          // hasChildren determines if bouards contains elements whose parentId is equal to the given id
          hasChildren={() => {
            boards.filter((board) => board.parentId === id).length > 0;
          }}
          expanded={board.expanded}
          toggleExpanded={handleToggle}
          color={ArrowColor}
        />
        {effectiveEditable ? (
          <RenameInput
            autoFocus
            onFocus={(event) => {
              event.target.select();
            }}
            type="text"
            value={board.title}
            onChange={(e) => {
              renameBoard(id, e.target.value);
            }}
            onBlur={() => {
              setEditable(false);
              setHover(false);
              if (newHighlight) {
                setHighlightTarget(null);
              }
            }}
            onKeyDown={renameHandleKeyDown}
          />
        ) : (
          <Tooltip
            title={
              <React.Fragment>
                <div>
                  {htmlParser.parse(formatBoardHTML(board.title, board.text))}
                </div>
              </React.Fragment>
            }
            placement="right"
          >
            <AxisTitle
              onDoubleClick={() => {
                setEditable(true);
              }}
              tabIndex={0}
              onKeyDown={treeKeyCommands}
            >
              {board.title}
            </AxisTitle>
          </Tooltip>
        )}
      </AxisNodeContainer>
      <NodeMenu />
    </div>
  );
};

const AxisNode = styled(AxisNodeBase)``;
export default AxisNode;
