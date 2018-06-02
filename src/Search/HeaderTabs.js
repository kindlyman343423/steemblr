import React from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
const NavBar = styled.div`
  display: inline-flex;
  background-color: ${colors.background};
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  padding-top: 7px;
  padding-bottom: 5px;

  a {
    text-transform: uppercase;
    text-align: center;
    align-self: center;
  }
  font-weight: 300;
  @media (max-width: 1024px) {
  }
  @media (max-width: 768px) {
  }
  @media (max-width: 425px) {
    a {
      padding: 0;
      font-size: 10px;
    }
  }
  @media (max-width: 375px) {
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  align-content: center;

  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;
const HeaderTabs = ({ match }) => {
  const content = [
    "new",
    "trending",
    "text",
    "photos",
    "gifs",
    "quotes",
    "links",
    "audio",
    "video"
  ];
  return (
    <Container>
      <NavBar className="navLinks">
        {content.map(name => {
          const treatedName = name[0].toUpperCase() + name.slice(1);
          return (
            <Link key={name} activeClassName="selected" to={`/explore/${name}`}>
              {treatedName.replace("-", " ")}
            </Link>
          );
        })}
      </NavBar>
    </Container>
  );
};

export default hot(module)(HeaderTabs);
