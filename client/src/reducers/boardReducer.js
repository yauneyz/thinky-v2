import arrayEqual from "array-equal";
import produce from "immer";
import { move } from "../utils/array";

export default function boardReducer(state, action) {
  const { boards } = state;
  switch (action.type) {
    case "SET_BOARDS":
      return { ...state, boards: action.boards };

    case "ADD_BOARD":
      return { ...state, boards: [...boards, action.board] };

    case "DELETE_BOARD":
      return {
        ...state,
        boards: boards.filter((board) => board.id !== action.id),
      };

    case "SET_BOARD_TEXT":
      return {
        ...state,
        boards: boards.map((board) => {
          if (board.id === action.id) {
            return { ...board, text: action.text };
          }
          return board;
        }),
      };

    case "SET_BOARD_TITLE":
      return {
        ...state,
        boards: boards.map((board) => {
          if (board.id === action.id) {
            return { ...board, title: action.title };
          }
          return board;
        }),
      };

    case "TOGGLE_EXPANDED":
      return {
        ...state,
        boards: boards.map((board) => {
          if (board.id === action.id) {
            return { ...board, expanded: !board.expanded };
          }
          return board;
        }),
      };

    case "COLLAPSE_ALL":
      return {
        ...state,
        boards: boards.map((board) => {
          return { ...board, expanded: false };
        }),
      };

    case "EXPAND_ALL":
      return {
        ...state,
        boards: boards.map((board) => {
          return { ...board, expanded: true };
        }),
      };
    case "EXPAND_BELOW":
      return;
    case "COLLAPSE_BELOW":
      return;

    case "MOVE_BOARD":
      return {
        ...state,
        boards: boards.map((board) => {
          if (board.id === action.id) {
            return { ...board, parentId: action.parentId };
          }
          return board;
        }),
      };
    // if drag occurs before drop, its new index in boards should be after drop. if it occurs after, it should be moved to before
    case "REORDER_BOARDS":
      return {
        ...state,
        boards: produce(boards, (draft) => {
          if (action.dragIndex < action.dropIndex) {
            move(draft, action.dragIndex, action.dropIndex + 1);
          } else {
            move(draft, action.dragIndex, action.dropIndex);
          }
        }),
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
