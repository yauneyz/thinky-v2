import store from "../redux/store";
require("dotenv").config();

async function save() {
  // Create a post request to store the current boards array

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
}

export default save;
