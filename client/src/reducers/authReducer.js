export default function authReducer(state, action) {
  switch (action.type) {
    case "SET_AUTH":
      return { ...state, auth: action.auth };
    case "SET_TOKEN":
      return { ...state, token: action.token };
    case "SET_EMAIL_VERIFIED":
      return { ...state, emailVerified: action.emailVerified };
    case "SET_AUTH_STATE":
      return { ...state, ...action.state };
    case "LOGOUT":
      return { ...state, auth: false, token: null, emailVerified: false };

    default:
      return state;
  }
}
