import React from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import { hot } from "react-hot-loader";
import { NavLink } from "react-router-dom";
import "./Explore.css";
const NavBar = styled.div`
  display: inline-flex;
  background-color: ${colors.background};
  justify-content: center;
  width: 100%;
  a {
    text-align: center;
    padding: 5px;
    align-self: center;
  }
  font-weight: 200;
  @media (max-width: 1024px) {
  }
  @media (max-width: 768px) {
  }
  @media (max-width: 425px) {
    a {
      padding: 0;
      font-size: 12px;
    }
  }
  @media (max-width: 375px) {
  }
`;
const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;
const HeaderTabs = ({ match }) => {
  const content = [
    "trending",
    "staff-picks",
    "text",
    "photos",
    "gifs",
    "quotes",
    "links",
    "chats",
    "audio",
    "video"
  ];
  return (
    <Container>
      <NavBar className="navLinks">
        {content.map(name => {
          const treatedName = name[0].toUpperCase() + name.slice(1);
          return (
            <NavLink
              key={name}
              activeClassName="selected"
              to={`${match.url}/${name}`}
            >
              {treatedName.replace("-", " ")}
            </NavLink>
          );
        })}
      </NavBar>
    </Container>
  );
};

export default hot(module)(HeaderTabs);
