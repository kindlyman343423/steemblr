import React from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect
} from "react-router-dom";
import "./Explore.css";
const NavBar = styled.div`
  display: inline-flex;
  a {
    padding: 5px;
    align-self: center;
  }
  font-weight: 200;
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
    "video",
    "asks"
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

export default HeaderTabs;
