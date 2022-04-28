const getBoards = () => fetch("/boards").then((response) => response.json());

export { getBoards };
