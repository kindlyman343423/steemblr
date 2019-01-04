import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Icon } from "react-icons-kit";
import { ic_more_horiz } from "react-icons-kit/md/ic_more_horiz";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Container = styled.div`
  a {
    outline: none;
  }
  svg {
    cursor: pointer;
  }
`;
export default class ShareMenu extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <Container>
        <Icon
          icon={ic_more_horiz}
          aria-owns={anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
          size={30}
          onClick={this.handleClick}
        />

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Link
            to={`/post/@${this.props.postAuthor}/${this.props.postPermlink}`}
            target="_blank"
          >
            <MenuItem onClick={this.handleClose}>Permalink</MenuItem>
          </Link>
        </Menu>
      </Container>
    );
  }
}
