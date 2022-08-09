import styled from "styled-components";
import React, { useContext, useRef, useState } from "react";
import { AuthContext, DisplayContext } from "../contexts";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../constants/itemTypes";
import { useMutation, useQueryClient } from "react-query";
import { deleteTab } from "../api/undo";

const TabBarContainer = styled.div`
  height: 2em;
  width: 100%;
  background: #ddd;
  display: flex;
`;

const TabDeleteButton = styled.span`
  float: right;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  margin-left: auto;
  &:hover {
    background: red;
    color: white;
  }
  margin-right: 5px;
`;

const TabTitle = styled.div`
  display: inline-block;
  margin-left: 5px;
`;

const TabTitleInput = styled.input`
  width: 5.6em;
  float: left;
`;

// Button with a delete icon on the right
function TabButtonBase({
  index,
  name,
  className,
  openTab,
  deleteTab,
  renameTab,
  newTab,
  setNewTab,
}) {
  const [editable, setEditable] = useState(newTab === index);
  const handleChange = (e) => {
    renameTab(e);
  };
  const handleDoubleClick = () => {
    setEditable(true);
  };
  const handleBlur = () => {
    setNewTab(-1);
    setEditable(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setEditable(false);
    }
  };

  // Drag and drop
  const ref = useRef(null);
  const { moveTab } = useContext(DisplayContext);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.TAB,
    collect(monitor) {
      return {
        handlerId: monitor.handlerId,
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
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
      moveTab(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TAB,
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  drag(drop(ref));
  const opacity = isDragging ? 0.5 : 1;

  return (
    <div
      ref={ref}
      style={{ opacity }}
      onClick={openTab}
      onDoubleClick={handleDoubleClick}
      className={className}
    >
      {editable ? (
        <TabTitleInput
          autoFocus
          onFocus={(event) => event.target.select()}
          type="text"
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <TabTitle>{name}</TabTitle>
      )}

      <TabDeleteButton onClick={deleteTab}>x</TabDeleteButton>
    </div>
  );
}

const TabButton = styled(TabButtonBase)`
  background: ${(props) => (props.open === props.index ? "#fff" : "gray")};
  width: 8em;
  border-radius: 4px;
  margin: 1px;
  margin-bottom: 0;
  display: flex;
  align-items: center;
`;

//A button for adding a tabs
const AddTabButton = styled.button`
  background: #ddd;
  width: 2em;
  height: 1.8em;
  border: 1px solid #ddd;
  border-radius: 0.5em;
  margin-left: auto;
  margin-right: 0.5em;
  &:hover {
    background: green;
  }
`;

export default function TabBar() {
  const queryClient = useQueryClient();
  const deleteTabMutation = useMutation(
    (data) => {
      return deleteTab(data);
    },
    {
      onSuccess: () => {
        // Invalidate the cache for the deleted tab
        queryClient.invalidateQueries();
      },
    }
  );

  const { open, setOpen, tabs, setTabs, renameTab } =
    useContext(DisplayContext);

  const { token } = useContext(AuthContext);

  // Tracks whether or not we have a new tab we need to focus
  const [newTab, setNewTab] = useState(-1);

  //Function for adding a tab
  const addTab = () => {
    setTabs([...tabs, { name: "New Tab", editors: [] }]);
    setOpen(tabs.length);
    setNewTab(tabs.length);
  };

  // Add the tab to the server's list of deleted tabs using a mutation

  const tabsList = tabs.map((tab, index) => {
    const deleteTab = async (event) => {
      event.stopPropagation();
      const numTabs = tabs.length;
      if (index === open) {
        setOpen(Math.min(index, numTabs - 2));
      } else {
        setOpen(Math.max(0, open - 1));
      }
      setTabs(tabs.filter((_, i) => i !== index));

      const name = tab.name;
      const tabIndex = index;
      const boards = tab.editors;
      const data = { token, boards, index: tabIndex, name };

      deleteTabMutation.mutate(data);
    };

    return (
      <TabButton
        open={open}
        key={index}
        index={index}
        deleteTab={deleteTab}
        renameTab={(event) => {
          renameTab(index, event.target.value);
        }}
        openTab={() => setOpen(index)}
        name={tab.name}
        newTab={newTab}
        setNewTab={setNewTab}
      ></TabButton>
    );
  });

  return (
    <TabBarContainer>
      {tabsList}
      <AddTabButton onClick={addTab}>+</AddTabButton>
    </TabBarContainer>
  );
}
