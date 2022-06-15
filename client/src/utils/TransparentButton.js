import styled from "styled-components";

const TransparentButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  &:hover {
    background: transparent;
  }
`;

export default TransparentButton;
