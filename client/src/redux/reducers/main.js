import update from "react-addons-update";
import { ObjectID } from "bson";
import getRandoms from "../../utils/randomizer";

import {
  LOGOUT,
  LOGIN,
  SET_COLUMN,
  SET_ACTIVE_BOARD,
  SET_IDEAS,
  SET_COLUMNS,
  SET_STATE,
  SET_LOADED,
  SET_RANDOM,
  RENAME_BOARD,
  DELETE_BOARD,
  REORDER_BOARDS,
  REORDER_COLUMNS,
  REORDER_IDEAS,
  ADD_COLUMN,
  ADD_IDEA,
  SET_IDEA,
} from "../action_types";

const initialState = {
  boards: [],
  active: 0,
  isLoaded: false,
  loggedIn: false,
  randoms: getRandoms(),
  mounted: false,
};

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function main(state = initialState, action) {
  switch (action.type) {
    case SET_STATE: {
      const { data } = action.payload;
      return {
        ...state,
        boards: data,
      };
    }

    case SET_ACTIVE_BOARD: {
      const { active } = action.payload;
      return {
        ...state,
        active: active,
      };
    }

    case RENAME_BOARD: {
      const { target, newName } = action.payload;
      const newBoards = [...state.boards];
      newBoards[target].name = newName;
      return {
        ...state,
        boards: newBoards,
      };
    }

    case DELETE_BOARD: {
      // Don't delete the last board
      if (state.boards.length === 1) {
        return state;
      }

      const { target } = action.payload;
      state.boards.splice(target, 1);
      const newBoards = [...state.boards];
      const newActive = Math.min(state.active, newBoards.length - 1);
      return {
        ...state,
        boards: newBoards,
        active: newActive,
      };
    }

    case SET_LOADED: {
      const { isLoaded } = action.payload;
      return {
        ...state,
        isLoaded: isLoaded,
      };
    }

    case SET_RANDOM: {
      const { randoms } = action.payload;
      return {
        ...state,
        randoms: randoms,
      };
    }

    case LOGIN: {
      const { loggedIn } = action.payload;
      return {
        ...state,
        loggedIn: loggedIn,
      };
    }

    case LOGOUT: {
      return initialState;
    }

    case SET_COLUMN: {
      const { index, name, data } = action.payload;
      const id = state.boards[state.active].columns[index]._id;
      const newColumn = {
        _id: id,
        name: name,
        data: data,
      };
      const updatedBoard = update(state.boards[state.active], {
        columns: { [index]: { $set: newColumn } },
      });
      let updatedBoards = update(state.boards, {
        $splice: [[state.active, 1, updatedBoard]],
      });
      return {
        ...state,
        boards: updatedBoards,
      };
    }

    case SET_IDEAS: {
      const { ideas, active } = action.payload;
      let updatedBoard = update(state.boards[active], {
        ideas: { $set: ideas },
      });
      let updatedBoards = update(state.boards, {
        $splice: [[active, 1, updatedBoard]],
      });
      return {
        ...state,
        boards: updatedBoards,
      };
    }

    case SET_COLUMNS: {
      const { columns, active } = action.payload;
      let updatedBoard = update(state.boards[active], {
        columns: { $set: columns },
      });
      let updatedBoards = update(state.boards, {
        $splice: [[active, 1, updatedBoard]],
      });
      return {
        ...state,
        boards: updatedBoards,
      };
    }

    case REORDER_BOARDS: {
      const { origin, target } = action.payload;
      const updatedBoards = reorder(state.boards, origin, target);
      return {
        ...state,
        boards: updatedBoards,
      };
    }

    case REORDER_COLUMNS: {
      const { origin, target } = action.payload;
      const updatedColumns = reorder(
        state.boards[state.active].columns,
        origin,
        target
      );
      const updatedBoard = update(state.boards[state.active], {
        columns: { $set: updatedColumns },
      });
      const updatedBoards = update(state.boards, {
        $splice: [[state.active, 1, updatedBoard]],
      });
      return {
        ...state,
        boards: updatedBoards,
      };
    }

    case REORDER_IDEAS: {
      const { origin, target } = action.payload;
      const updatedIdeas = reorder(
        state.boards[state.active].ideas,
        origin,
        target
      );
      let updatedBoard = update(state.boards[state.active], {
        ideas: { $set: updatedIdeas },
      });
      let updatedBoards = update(state.boards, {
        $splice: [[state.active, 1, updatedBoard]],
      });
      return {
        ...state,
        boards: updatedBoards,
      };
    }

    case ADD_COLUMN: {
      const id = new ObjectID();
      const newColumn = {
        _id: id.toString(),
        name: "New Column",
        data: "",
      };
      const updatedBoard = update(state.boards[state.active], {
        columns: { $push: [newColumn] },
      });
      const updatedBoards = update(state.boards, {
        $splice: [[state.active, 1, updatedBoard]],
      });
      return {
        ...state,
        boards: updatedBoards,
      };
    }

    case ADD_IDEA: {
      const id = new ObjectID();
      const newIdea = {
        _id: id.toString(),
        data: "",
      };
      const updatedBoard = update(state.boards[state.active], {
        ideas: { $push: [newIdea] },
      });
      const updatedBoards = update(state.boards, {
        $splice: [[state.active, 1, updatedBoard]],
      });
      return {
        ...state,
        boards: updatedBoards,
      };
    }

    case SET_IDEA: {
      const { index, value } = action.payload;
      const id = state.boards[state.active].ideas[index]._id;
      const newIdea = {
        _id: id,
        data: value,
      };
      const updatedBoard = update(state.boards[state.active], {
        ideas: { [index]: { $set: newIdea } },
      });
      let updatedBoards = update(state.boards, {
        $splice: [[state.active, 1, updatedBoard]],
      });
      return {
        ...state,
        boards: updatedBoards,
      };
    }

    default:
      return state;
  }
}

export { main };
