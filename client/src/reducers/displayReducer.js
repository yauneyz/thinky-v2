import arrayEqual from "array-equal";
import produce from "immer";

function displayReducer(state, action) {
  const { tabs, open } = state;
  switch (action.type) {
    // Standard actions
    case "SET_OPEN":
      return { ...state, open: action.open };
    case "SET_TRAIL":
      return { ...state, trail: action.trail };
    case "SET_TABS":
      return { ...state, tabs: action.tabs };
    case "SET_STATE":
      return action.state;
    case "SET_TOP_NODE":
      return { ...state, topNode: action.topNode };
    case "SET_HIGHLIGHT_TARGET":
      return { ...state, highlightTarget: action.highlightTarget };
    // Custom Actions
    case "OPEN_EDITOR": {
      // If no tabs are open, create one and add this editor to it
      if (tabs.length === 0) {
        return {
          ...state,
          tabs: [{ name: "New Tab", editors: [action.coord] }],
        };
      }
      // Don't add the editor if the coord is already open in the current tab
      if (
        tabs[open].editors.find((editor) => arrayEqual(editor, action.coord))
      ) {
        return state;
      }
      // Add the editor to the current tab
      const newTabs = produce(tabs, (draft) => {
        draft[open].editors.push(action.coord);
      });
      return { ...state, tabs: newTabs };
    }
    case "CLOSE_EDITOR": {
      const newTabs = produce(tabs, (draft) => {
        draft[open].editors = draft[open].editors.filter(
          (editor) => editor !== action.id
        );
      });
      return { ...state, tabs: newTabs };
    }
    // Closes all editors whose coordinates contain the given coord
    case "CLOSE_EDITORS": {
      const newTabs = produce(tabs, (draft) => {
        draft[open].editors = draft[open].editors.filter(
          // editor not in ids
          (editor) => action.ids.includes(editor)
        );
      });
      return { ...state, tabs: newTabs };
    }

    case "ADD_TAB": {
      const newTabs = produce(tabs, (draft) => {
        draft.push(action.tab);
      });
      return { ...state, tabs: newTabs, open: tabs.length };
    }

    case "RENAME_TAB":
      return {
        ...state,
        tabs: produce(tabs, (draft) => {
          draft[action.index].name = action.name;
        }),
      };

    case "MOVE_TAB":
      return {
        ...state,
        tabs: produce(tabs, (draft) => {
          const tab = draft[action.dragIndex];
          draft.splice(action.dragIndex, 1);
          draft.splice(action.hoverIndex, 0, tab);
        }),
        open: action.hoverIndex,
      };

    case "MOVE_EDITOR":
      return {
        ...state,
        tabs: produce(tabs, (draft) => {
          const tab = draft[open];
          const editor = tab.editors[action.dragIndex];
          tab.editors.splice(action.dragIndex, 1);
          tab.editors.splice(action.hoverIndex, 0, editor);
        }),
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default displayReducer;
