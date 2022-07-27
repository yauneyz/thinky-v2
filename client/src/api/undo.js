exports.getDeletedTabs = (token) => {
  if (!token) {
    return null;
  }
  return fetch("/undo/getDeletedTabs", {
    method: "GET",
    headers: new Headers({
      Authorization: "Bearer " + token,
    }),
  }).then((response) => response.json());
};

exports.deleteTab = async (data) => {
  const { token, boards, name, index } = data;
  if (!token) {
    return null;
  }
  const body = { boards, name, index };
  return await fetch("/undo/deleteTab", {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(body),
  }).then((response) => response.json());
};

exports.restoreTab = async (data) => {
  const { token, id } = data;
  if (!token) {
    return null;
  }
  const body = { tabId: id };
  return await fetch("/undo/undoDeleteTab", {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(body),
  }).then((response) => response.json());
};

exports.deleteBoardRequest = async (data) => {
  const { token, board } = data;
  if (!token) {
    return null;
  }
  const body = { board };
  return await fetch("/undo/deleteAxis", {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(body),
  }).then((response) => response.json());
};

exports.restoreBoard = async (data) => {
  const { token, id } = data;
  if (!token) {
    return null;
  }
  const body = { boardId: id };
  return await fetch("/undo/undoDeleteAxis", {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(body),
  }).then((response) => response.json());
};

exports.getDeletedBoards = (token) => {
  if (!token) {
    return null;
  }
  return fetch("/undo/getDeletedAxes", {
    method: "GET",
    headers: new Headers({
      Authorization: "Bearer " + token,
    }),
  }).then((response) => response.json());
};
