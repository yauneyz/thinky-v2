import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext, FirebaseContext } from "../contexts";
import colorscheme from "../constants/colorscheme";
import fonts from "../constants/fonts";

const LogoutButtonStyled = styled.button`
  border-radius: 5px;
  border-color: ${colorscheme.secondary};
  box-shadow: 0 0 2px ${colorscheme.secondary};
  background: ${colorscheme.tertiary};
  font-family: ${fonts.heading};
  height: 2.3em;
  margin-top: auto;
  margin-bottom: auto;
  &:hover {
    cursor: pointer;
  }
`;
function LogoutButton() {
  const { Auth } = useContext(FirebaseContext);
  const { logout } = useContext(AuthContext);
  const doLogout = () => {
    signOut(Auth).then(() => {
      logout();
    });
  };
  return <LogoutButtonStyled onClick={doLogout}>Logout</LogoutButtonStyled>;
}

export default LogoutButton;
