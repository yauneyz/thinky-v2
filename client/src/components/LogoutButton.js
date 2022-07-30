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
  const { logout } = useContext(AuthContext);
  const doLogout = () => {
    signOut(Auth).then(() => {
      logout();
    });
  };
  return <LogoutButtonStyled onClick={doLogout}>Logout</LogoutButtonStyled>;
}

export default LogoutButton;
