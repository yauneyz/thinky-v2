import { produce } from "immer";

// Recursive function to set expanded to false on all boards
function collapseBoardsHelper(top) {
  top.expanded = false;
  for (let i = 0; i < top.children.length; i++) {
    collapseBoardsHelper(top.children[i]);
  }
  return top;
}

function expandBoardsHelper(top) {
  top.expanded = true;
  for (let i = 0; i < top.children.length; i++) {
    expandBoardsHelper(top.children[i]);
  }
  return top;
}

export default class BoardsController {
  constructor(boards, setBoards) {
    this.boards = boards;
    this.setBoards = setBoards;
    this.getBoard = this.getBoard.bind(this);
    this.replaceBoardHelper = this.replaceBoardHelper.bind(this);
    this.replaceBoard = this.replaceBoard.bind(this);
    this.replaceBoardInternal = this.replaceBoardInternal.bind(this);
    this.addChildHelper = this.addChildHelper.bind(this);
    this.addChild = this.addChild.bind(this);
    this.setBoardText = this.setBoardText.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.renameBoard = this.renameBoard.bind(this);
    this.collapseBoards = this.collapseBoards.bind(this);
    this.expandBoards = this.expandBoards.bind(this);
  }

  // Returns the board at the given coordinate
  getBoard(coord) {
    let current = this.boards;
    for (const i of coord) {
      current = current.children[i];
    }
    return current;
  }

  replaceBoardHelper(coord, newBoard, draft) {
    // Base case
    if (coord.length == 0) {
      draft.children = [newBoard];
    } else if (coord.length == 1) {
      draft.children[coord[0]] = newBoard;
    }
    // If we still have nested coordinates to work through
    else {
      draft.children[coord[0]] = this.replaceBoardHelper(
        coord.slice(1),
        newBoard,
        draft.children[coord[0]]
      );
    }
    return draft;
  }

  // Replaces the board at the given coordinate with the new board, updating the state with the result
  replaceBoard(coord, newBoard) {
    if (coord.length == 0) {
      this.setBoards(newBoard);
    } else {
      const replacementBoard = produce(this.boards, (draft) =>
        this.replaceBoardHelper(coord, newBoard, draft)
      );
      this.setBoards(replacementBoard);
    }
  }

  // Replaces the board at the given coordinate with the new board, returning the result
  replaceBoardInternal(coord, newBoard) {
    if (coord.length == 0) {
      return newBoard;
    }
    return produce(this.boards, (draft) =>
      this.replaceBoardHelper(coord, newBoard, draft)
    );
  }

  addChildHelper(coord, newBoard, draft) {
    // Empty case
    if (coord.length == 0) {
      draft.children.push(newBoard);
    } else if (coord.length == 1) {
      // Base Case
      draft.children[coord[0]].children.push(newBoard);
    }
    // If we still have nested coordinates to work through
    else {
      this.addChildHelper(coord.slice(1), newBoard, draft.children[coord[0]]);
    }
    return draft;
  }

  // Adds a child to the board at the given coordinate
  addChild(coord, newBoard) {
    const newBoards = produce(this.boards, (draft) =>
      this.addChildHelper(coord, newBoard, draft)
    );
    this.boards = newBoards;
    this.setBoards(newBoards);
  }

  deleteChildHelper(coord, childIndex, draft) {
    // Empty case
    if (coord.length == 0) {
      draft.children.splice(childIndex, 1);
    } else if (coord.length == 1) {
      // Base Case
      draft.children[coord[0]].children.splice(childIndex, 1);
    }
    // If we still have nested coordinates to work through
    else {
      this.deleteChildHelper(
        coord.slice(1),
        childIndex,
        draft.children[coord[0]]
      );
    }
    return draft;
  }

  // Deletes the board at the given coordinate
  deleteChild(coord, childIndex) {
    const newBoards = produce(this.boards, (draft) => {
      return this.deleteChildHelper(coord, childIndex, draft);
    });
    this.boards = newBoards;
    this.setBoards(newBoards);
  }

  // Sets the text of the board at the given coordinate
  setBoardText(coord, newText) {
    const newBoard = produce(this.getBoard(coord), (draft) => {
      draft.text = newText;
    });
    const newBoards = this.replaceBoardInternal(coord, newBoard);
    this.setBoards(newBoards);
  }

  // Toggles the expanded property of a board
  toggleExpanded(coord) {
    const newBoard = produce(this.getBoard(coord), (draft) => {
      draft.expanded = !draft.expanded;
    });
    const newBoards = this.replaceBoardInternal(coord, newBoard);
    this.setBoards(newBoards);
  }

  // Deletes a board at the given coordinate
  deleteBoard(coord) {
    this.deleteChild(coord.slice(0, coord.length - 1), coord[coord.length - 1]);
  }

  // Rename a board
  renameBoard(coord, newName) {
    const newBoard = produce(this.getBoard(coord), (draft) => {
      draft.name = newName;
    });
    const newBoards = this.replaceBoardInternal(coord, newBoard);
    this.setBoards(newBoards);
  }

  collapseBoards() {
    const newBoards = produce(this.boards, (draft) => {
      collapseBoardsHelper(draft);
    });
    this.setBoards(newBoards);
  }

  expandBoards() {
    const newBoards = produce(this.boards, (draft) => {
      expandBoardsHelper(draft);
    });
    this.setBoards(newBoards);
  }

  // Collapses all the boards below the given coordinate
  collapseBelow(coord) {
    const targetSubset = this.getBoard(coord);
    const newBoard = produce(targetSubset, (draft) => {
      collapseBoardsHelper(draft);
      draft.expanded = true;
    });
    const newBoards = this.replaceBoardInternal(coord, newBoard);
    this.setBoards(newBoards);
  }

  // Expands all the boards below the given coordinate
  expandBelow(coord) {
    const targetSubset = this.getBoard(coord);
    const newBoard = produce(targetSubset, (draft) => {
      expandBoardsHelper(draft);
      draft.expanded = true;
    });
    const newBoards = this.replaceBoardInternal(coord, newBoard);
    this.setBoards(newBoards);
  }
}
