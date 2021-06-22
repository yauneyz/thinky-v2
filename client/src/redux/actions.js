import {
  LOGIN,
  LOGOUT,
  SET_LOADED,
  SET_ACTIVE_BOARD,
  SET_IDEAS,
  SET_COLUMNS,
  SET_COLUMN,
  SET_RANDOM,
  SET_STATE,
  DELETE_BOARD,
  RENAME_BOARD,
  REORDER_BOARDS,
  REORDER_COLUMNS,
  REORDER_IDEAS,
  ADD_COLUMN,
  ADD_IDEA,
  SET_IDEA,
} from "./action_types.js";
import getRandoms from "../utils/randomizer";
export const setStoreState = function (data) {
  return {
    type: SET_STATE,
    payload: {
      data,
    },
  };
};

export const setLoaded = (loaded) => ({
  type: SET_LOADED,
  payload: {
    isLoaded: loaded,
  },
});

export const setRandom = function () {
  const randoms = getRandoms();
  return {
    type: SET_RANDOM,
    payload: {
      randoms: randoms,
    },
  };
};

export const setActiveBoard = function (active) {
  return {
    type: SET_ACTIVE_BOARD,
    payload: {
      active: active,
    },
  };
};

export const deleteBoard = function (target) {
  return {
    type: DELETE_BOARD,
    payload: {
      target: target,
    },
  };
};

export const renameBoard = function (target, newName) {
  return {
    type: RENAME_BOARD,
    payload: {
      target: target,
      newName: newName,
    },
  };
};

export const login = function () {
  return {
    type: LOGIN,
    payload: {
      loggedIn: true,
    },
  };
};

export const logout = function () {
  return {
    type: LOGOUT,
    payload: {
      loggedIn: false,
    },
  };
};

export const setColumn = function (index, name, data) {
  return {
    type: SET_COLUMN,
    payload: {
      index: index,
      name: name,
      data: data,
    },
  };
};

export const setIdeas = function (ideas, active) {
  return {
    type: SET_IDEAS,
    payload: {
      ideas: ideas,
      active: active,
    },
  };
};

export const setColumns = function (columns, active) {
  return {
    type: SET_COLUMNS,
    payload: {
      columns: columns,
      active: active,
    },
  };
};

export const reorderBoards = function (origin, target) {
  return {
    type: REORDER_BOARDS,
    payload: {
      origin: origin,
      target: target,
    },
  };
};

export const reorderColumns = function (origin, target) {
  return {
    type: REORDER_COLUMNS,
    payload: {
      origin: origin,
      target: target,
    },
  };
};

export const reorderIdeas = function (origin, target) {
  return {
    type: REORDER_IDEAS,
    payload: {
      origin: origin,
      target: target,
    },
  };
};

export const addColumn = function () {
  return {
    type: ADD_COLUMN,
    payload: {},
  };
};

export const addIdea = function () {
  return {
    type: ADD_IDEA,
    payload: {},
  };
};

export const setIdea = function (index, value) {
  return {
    type: SET_IDEA,
    payload: {
      index: index,
      value: value,
    },
  };
};
