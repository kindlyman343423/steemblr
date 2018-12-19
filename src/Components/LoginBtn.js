import styled from "styled-components";
import colors from "../styles/colors";

const LoginBtn = styled.button`
  padding: 10px;
  border: 0;
  background-color: ${colors.buttons.login};
  outline: none;
  color: #fff;
  font-weight: 700;
  transition: 0.1s;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.buttons.loginHover};
    transition: 0.1s;
  }
`;
export default LoginBtn;
