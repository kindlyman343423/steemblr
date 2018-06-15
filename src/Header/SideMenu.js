import React, { Component } from "react";
import AddNew from "./AddNew";
import { Link, NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import styled from "styled-components";
import Icon from "react-icons-kit";
import colors from "../styles/colors";

import { ic_menu } from "react-icons-kit/md/ic_menu";
//REDUX
import { connect } from "react-redux";
import { changeVotePower } from "../actions/steemActions";

const StyledDiv = styled.div`
  text-align: left;
  a {
    color: black;
  }
`;
const styles = {};
const MenuItem = styled.div`
  padding: 10px;
  a {
    color: red;
  }
  cursor: pointer;
`;
const Slider = styled.input`
  -webkit-appearance: none;
  width: 200px;
  height: 10px;
  border-radius: 5px;
  background: #ccc;
  outline: none;

  // Slider Handle
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${colors.background};
    cursor: pointer;
    -webkit-transition: background 0.15s ease-in-out;
    transition: background 0.15s ease-in-out;

    &:hover {
      background: ${colors.events.hover};
    }
  }

  &:active::-webkit-slider-thumb {
    background: ${colors.events.hover};
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border: 0;
    border-radius: 50%;
    background: #353535;
    cursor: pointer;
    -webkit-transition: background 0.15s ease-in-out;
    transition: background 0.15s ease-in-out;

    &:hover {
      background: #e06161;
    }
  }

  &:active::-moz-range-thumb {
    background: #e06161;
  }
`;
class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      votingWeight: 100
    };
    this.handleVotingSlider = this.handleVotingSlider.bind(this);
    this.handleVotingSliderDragStop = this.handleVotingSliderDragStop.bind(
      this
    );
  }
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };
  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });
  handleVotingSlider(e, value) {
    this.setState({
      votingWeight: e.target.value
    });
  }
  handleVotingSliderDragStop() {
    this.props.changeVotePower(Number(this.state.votingWeight * 100));
  }

  render() {
    return (
      <StyledDiv>
        <Icon
          icon={ic_menu}
          size={32}
          onClick={this.handleToggle}
          className="dashboardIcon"
        />

        <Drawer
          anchor="right"
          open={this.state.open}
          openSecondary={true}
          docked={false}
          onClose={this.toggleDrawer("open", false)}
        >
          {window.innerWidth > 425 ? (
            void 0
          ) : (
            <span>
              <Link to="/home">
                <MenuItem>Home</MenuItem>
              </Link>

              <NavLink to="/explore/trending">
                <MenuItem>Explore</MenuItem>
              </NavLink>

              <MenuItem>
                <AddNew />
              </MenuItem>
            </span>
          )}
          <NavLink to="/settings/account">
            <MenuItem>Settings</MenuItem>
          </NavLink>
          <MenuItem>
            Voting Power: {this.state.votingWeight} % <br />
            <Slider
              type="range"
              min={1}
              max={100}
              value={this.state.votingWeight}
              onChange={this.handleVotingSlider}
              onBlur={this.handleVotingSliderDragStop}
            />
          </MenuItem>
          <NavLink to="/logout">
            <MenuItem>Logout</MenuItem>
          </NavLink>
        </Drawer>
      </StyledDiv>
    );
  }
}
const mapStateToProps = state => ({
  votePower: state.votePower
});
export default connect(
  mapStateToProps,
  { changeVotePower }
)(withStyles(styles)(SideMenu));
