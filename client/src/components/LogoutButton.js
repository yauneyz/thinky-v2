import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext, FirebaseContext } from "../contexts";

const LogoutButtonStyled = styled.button`
  border-radius: 5px;
  background: red;
`;
function LogoutButton() {
  const { Auth } = useContext(FirebaseContext);
  const { setAuth, setToken } = useContext(AuthContext);
  const logout = () => {
    signOut(Auth).then(() => {
      setAuth(false);
      setToken(null);
      window.localStorage.setItem("auth", "false");
    });
  };
  return <LogoutButtonStyled onClick={logout}>Logout</LogoutButtonStyled>;
}

export default LogoutButton;
