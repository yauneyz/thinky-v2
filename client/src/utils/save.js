import store from "../redux/store";
require("dotenv").config();

const minSaveSpacing = 1000;

class Saver {
  constructor() {
    this.lastSaved = Date.now();
  }

  // Only save if more than 2 seconds have elapsed since last change
  async save() {
    if (Date.now() - this.lastSaved >= minSaveSpacing) { // Create a post request to store the current boards array

      const state = store.getState();

      // Make sure we're logged in and loaded
      if (!(state.loggedIn && state.isLoaded)) {
        return;
      }
      const data = { boards: state.boards, active: state.active };
      const _res = await fetch("boards", {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      this.lastSaved = Date.now();
    }
  }
}

export default Saver;
