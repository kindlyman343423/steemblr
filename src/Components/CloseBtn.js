import styled from "styled-components";

const CloseBtn = styled.button`
  align-self: flex-end;
  padding: 10px;
  border: 0;
  background-color: transparent;
  outline: none;

  font-weight: 700;
  transition: 0.5s;
  &:focus {
    background-color: #808e95;
    transition: 0.5s;
  }
`;

export default CloseBtn;
