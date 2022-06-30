import styled from "styled-components";

const TransparentButton = styled.button`
  background: transparent;
  margin: 2px;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  &:hover {
    box-shadow: 0 0 0 1px red;
  }
`;

export default TransparentButton;
