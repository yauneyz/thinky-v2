import store from "../redux/store";
require("dotenv").config();

async function save() {
  // Create a post request to store the current boards array
  //const baseURL = process.env.BASE_URL

  const state = store.getState();

  // Make sure we're logged in and loaded
  if (!(state.loggedIn && state.isLoaded)) {
    return;
  }
  const baseURL = "http://localhost:8000/";
  const data = { boards: store.getState().boards };
  const _res = await fetch(baseURL + "boards", {
    credentials: "include",
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}

export default save;
