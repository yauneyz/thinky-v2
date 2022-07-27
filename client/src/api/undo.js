export function getDeletedTabs(token) {
  if (!token) {
    return null;
  }
  return fetch("/undo/getDeletedTabs", {
    method: "GET",
    headers: new Headers({
      Authorization: "Bearer " + token,
    }),
  }).then((response) => response.json());
}

export async function deleteTab(data) {
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
}

export async function restoreTab(data) {
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
}

export async function deleteBoardRequest(data) {
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
}

export async function restoreBoard(data) {
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
}

export function getDeletedBoards(token) {
  if (!token) {
    return null;
  }
  return fetch("/undo/getDeletedAxes", {
    method: "GET",
    headers: new Headers({
      Authorization: "Bearer " + token,
    }),
  }).then((response) => response.json());
}
