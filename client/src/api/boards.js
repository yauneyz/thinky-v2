const getBoards = async (token) => {
  if (!token) {
    return null;
  }
  return fetch("/boards", {
    method: "get",
    headers: new Headers({
      Authorization: "Bearer " + token,
    }),
  }).then((response) => response.json());
};

export { getBoards };
