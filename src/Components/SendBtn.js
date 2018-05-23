import styled from "styled-components";

const SendBtn = styled.button`
  outline: none;
  align-self: flex-end;
  float: right;
  padding: 10px;
  border: 0;
  background-color: #29434e;
  outline: none;
  color: white;
  font-weight: 700;
  transition: 0.5s;
  &:focus {
    background-color: #1c313a;
    transition: 0.5s;
  }
`;

export default SendBtn;
