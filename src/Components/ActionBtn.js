import styled from "styled-components";
const ActionBtn = styled.button`
  outline: none;
  background-color: #fff;
  cursor: pointer;
  width: 50px;
  height: 25px;
  color: #000;
  border: none;
  :hover {
    transition: 0.2s;
    background-color: rgba(0, 0, 0, 0.1);
  }
  :active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
export default ActionBtn;
