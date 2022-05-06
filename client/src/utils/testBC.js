import BoardsController from "./BoardsController.js";

const boards = {
  name: "one",
  children: [
    {
      name: "two",
      children: [],
    },
    {
      name: "three",
      children: [],
    },
  ],
};

const newBoard = {
  name: "four",
  children: [
    {
      name: "five",
      children: [],
    },
    {
      name: "six",
      children: [],
    },
  ],
};

const bc = new BoardsController(boards, null, null);
