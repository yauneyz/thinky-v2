import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { useQuery } from "react-query";
import styled from "styled-components";
import TransparentButton from "../utils/TransparentButton";
import { DisplayContext, AuthContext, BoardsContext } from "../contexts";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { produce } from "immer";
import {
  restoreTab,
  restoreBoard,
  getDeletedTabs,
  getDeletedBoards,
} from "../api/undo";
import { useMutation, useQueryClient } from "react-query";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw);
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 9;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;
  background-color: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;
`;

const Undo = styled.div`
  cursor: pointer;
  &:hover {
    color: #0066ff;
  }
`;

export default function UndoPanel({ BC }) {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const { tabs, displayState, setDisplayState } = useContext(DisplayContext);
  const { boards, addBoard } = useContext(BoardsContext);
  const { token } = useContext(AuthContext);
  const { data: tabData, status: tabStatus } = useQuery("getDeletedTabs", () =>
    getDeletedTabs(token)
  );
  const { data: axesData, status: axesStatus } = useQuery(
    "getDeletedBoards",
    () => getDeletedBoards(token)
  );

  let deletedTabs = <div></div>;
  const queryClient = useQueryClient();
  const restoreTabMutation = useMutation((data) => restoreTab(data), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const restoreBoardMutation = useMutation((data) => restoreBoard(data), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  if (tabStatus === "success") {
    // User reverse order so more recent deletes are first
    const clone = [...tabData];
    tabData.reverse();
    deletedTabs = clone.map((tab) => {
      // Insets the tab into the given index
      const resurrect = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const tabIndex = tab.index;
        const name = tab.name;
        const editors = tab.boards;
        const tabData = { name, editors };
        // set tabs to be current tabs with the tab inserted at the given index
        const newTabs = produce(tabs, (draft) => {
          draft.splice(tabIndex, 0, tabData);
        });
        setDisplayState({ ...displayState, tabs: newTabs, open: tabIndex });
        const restoreData = { token, id: tab.id };
        restoreTabMutation.mutate(restoreData);
      };

      return (
        <Undo onClick={resurrect} key={tab.id}>
          {tab.name}
        </Undo>
      );
    });
  }

  let deletedAxes = [];
  if (axesStatus == "success") {
    const clone = [...axesData];
    axesData.reverse();
    deletedAxes = clone.map((axis) => {
      // Insets the tab into the given index
      const { board } = axis;
      if (!boards.includes(board.parentId)) {
        board.parentId = "ROOT";
      }
      const resurrect = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const restoreData = { token, id: axis.id };
        addBoard(board);
        restoreBoardMutation.mutate(restoreData);
      };

      return (
        <Undo onClick={resurrect} key={axis.id}>
          {board.title}
        </Undo>
      );
    });
  }

  return (
    <div>
      <div>
        <TransparentButton onClick={openModal}>
          <Icon icon={faTrashCan} inverse />
        </TransparentButton>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        closeTimeoutMS={500}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
      >
        <Container>
          <h1>Tabs</h1>
          {deletedTabs}
        </Container>
        <Container>
          <h1>Files</h1>
          {deletedAxes}
        </Container>
      </Modal>
      <ModalWrapper isOpen={isOpen} onClick={closeModal} />
    </div>
  );
}
