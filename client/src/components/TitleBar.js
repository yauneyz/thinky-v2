import React, { memo } from "react";
import LogoutButton from "./LogoutButton";
import styled from "styled-components";

const TitleWrapper = memo(styled.div`
  height: 3em;
  display: flex;
`);

const TitleText = memo(styled.span`
  font-size: 2em;
  font-weight: bold;
  margin-left: 1em;
  color: #e9241d;
`);

const WikiText = memo(styled.span`
  color: white;
  font-size: 1em;
  margin: 5px;
  align-self: center;
  margin-left: auto;
`);

export default function TitleBar() {
  return (
    <TitleWrapper>
      <TitleText>Idea Editor</TitleText>
      <WikiText>Wiki</WikiText>
      <LogoutButton />
    </TitleWrapper>
  );
}
