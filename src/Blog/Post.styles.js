import styled from "styled-components";
import colors from "../styles/colors";

export const tagStyles = {
  cursor: "pointer",
  paddingRight: "5px",
  color: colors.tags.normal,
  overflowWrap: "break-word"
};
export const Container = styled.div`
  box-sizing: border-box;
  padding: 0;
  border: 1px solid ${colors.borders.light}
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-bottom: 20px;
  border-radius: 2px;
  text-align: left;
  svg {
    padding-right: 10px;
  }
  img {
    max-width: 100%;
    height: auto;
    overflow: hidden;
  }
  iframe {
    max-width: 100%;
    min-height: 300px;
  }
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;
export const CardHeader = styled.div`
  box-sizing: border-box;
  padding: 10px;
  display: grid;
  grid-template-columns: 12% 60% auto;
  height: 75px;
  grid-column-gap: 10px;
`;
export const CardTitle = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: left;
  align-content: center;

  p {
    margin-top: 0;
    font-size: 14px;
    color: ${colors.font.light};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  b {
    cursor: pointer;
    font-weight: 500;
  }
`;

export const CardAvatar = styled.div`
  background: url(${props => props.url});
  width: 40px;
  height: 40px;
  background-size: cover;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-content: flex-start;
`;

export const Avatar2 = styled.img`
  width: 40px;
  max-height: 40px;
  height: auto;
`;
export const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    height: 50%;
  }
`;
export const CardFooter = styled.div`
  border-radius: 2px;
  z-index: 500;
  background-color: #fff;
  padding: 20px;
  font-size: 14px;
`;
export const TagContainer = styled.div`
  display: inline-block;
  width: 95%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const FooterActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
