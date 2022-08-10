import React, { memo, useContext } from "react";
import { AuthContext } from "../contexts";
import LogoutButton from "./LogoutButton";
import styled from "styled-components";
import ManageSubscriptionForm from "./ManageSubscriptionForm";
import colorscheme from "../constants/colorscheme";
import fonts from "../constants/fonts";

const TitleWrapper = memo(styled.div`
  height: 3em;
  display: flex;
  line-height: 3em;
  padding-left: 1em;
`);

// Logo image from public folder
const Logo = memo(styled.img`
  height: 100%;
  width: auto;
  margin-right: 0.5em;
`);

const TitleText = memo(styled.span`
  font-size: 2em;
  font-weight: bold;
  color: ${colorscheme.secondary};
  font-family: ${fonts.logo};
  margin-top: auto;
  margin-bottom: auto;
`);

const WikiText = memo(styled.span`
  color: ${colorscheme.secondary};
  font-size: 1em;
  margin: 5px;
  align-self: center;
  margin-left: auto;
  font-family: ${fonts.heading};
  &:hover {
    cursor: pointer;
  }
`);

export default function TitleBar() {
  const { customerId } = useContext(AuthContext);
  return (
    <TitleWrapper>
      <Logo src={process.env.PUBLIC_URL + "/light_logo.png"} />
      <TitleText>Thinky</TitleText>
      <WikiText>Wiki</WikiText>
      <LogoutButton />
      {customerId && <ManageSubscriptionForm customerId={customerId} />}
    </TitleWrapper>
  );
}
