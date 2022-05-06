import { produce } from "immer";

export default class BoardsController {
  constructor(boards, setBoardsState, queryClient) {
    this.boards = boards;
    this.setBoardsState = setBoardsState;
    this.queryClient = queryClient;
    this.getBoard = this.getBoard.bind(this);
    this.replaceBoardHelper = this.replaceBoardHelper.bind(this);
    this.replaceBoard = this.replaceBoard.bind(this);
    this.addChildHelper = this.addChildHelper.bind(this);
    this.addChild = this.addChild.bind(this);
    this.setBoards = this.setBoards.bind(this);
    this.setBoardText = this.setBoardText.bind(this);
  }

  getText() {
    return "Hello There";
  }

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

  replaceBoard(coord, newBoard) {
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

  addChild(coord, newBoard) {
    const newBoards = produce(this.boards, (draft) =>
      this.addChildHelper(coord, newBoard, draft)
    );
    this.boards = newBoards;
    this.setBoardsState(newBoards);
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

  deleteChild(coord, childIndex) {
    const newBoards = produce(this.boards, (draft) => {
      return this.deleteChildHelper(coord, childIndex, draft);
    });
    this.boards = newBoards;
    this.setBoardsState(newBoards);
  }

  setBoards(coord, newVal) {
    const newBoards = this.replaceBoard(coord, newVal);
    this.boards = newBoards;
    this.setBoardsState(newBoards);
  }

  setBoardText(coord, newText) {
    const newBoard = produce(this.getBoard(coord), (draft) => {
      draft.text = newText;
    });
    const newBoards = this.replaceBoard(coord, newBoard);
    this.boards = newBoards;
  }
}
