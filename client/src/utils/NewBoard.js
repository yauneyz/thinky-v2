import guid from "./guid";
/*
 * This file specifies what a new board should look like.
 */

const newBoard = {
  title: "Untitled",
  subtitle: "",
  children: [],
  text: "",
  expanded: true,
  id: guid(),
  parentId: null,
};

export default newBoard;
