import styled from "styled-components";
import React, { useContext } from "react";
import { DisplayContext } from "../contexts";

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
  &:hover {
    background: red;
    color: white;
  }
`;

// Button with a delete icon on the right
function TabButtonBase({ children, className, openTab, deleteTab }) {
  return (
    <button className={className} onClick={openTab}>
      {children}
      <TabDeleteButton onClick={deleteTab}>x</TabDeleteButton>
    </button>
  );
}

const TabButton = styled(TabButtonBase)`
  background: ${(props) => (props.open === props.index ? "#fff" : "#ddd")};
  width: 8em;
  border-radius-top: 0.5em;
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
  const { open, setOpen, tabs, setTabs } = useContext(DisplayContext);

  //Function for adding a tab
  const addTab = () => {
    setTabs([...tabs, { name: "New Tab", editors: [] }]);
    setOpen(tabs.length);
  };

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
    };
    return (
      <TabButton
        open={open}
        key={index}
        index={index}
        deleteTab={deleteTab}
        openTab={() => setOpen(index)}
      >
        {tab.name}
      </TabButton>
    );
  });

  return (
    <TabBarContainer>
      {tabsList}
      <AddTabButton onClick={addTab}>+</AddTabButton>
    </TabBarContainer>
  );
}
