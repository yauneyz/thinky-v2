import React from "react";
import styled from "styled-components";
import colorscheme from "../constants/colorscheme";

const LoadingScreen = styled.div`
  font-size: 48px;
  margin-left: auto;
  margin-right: auto;
  background: linear-gradient(
    to right,
    ${colorscheme.secondary},
    ${colorscheme.primary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  )text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
`;

export default function LoadingPage() {
  return <LoadingScreen>Loading...</LoadingScreen>;
}
