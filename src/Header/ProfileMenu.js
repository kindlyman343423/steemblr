import React, { Component } from "react";

import { NavLink } from "react-router-dom";

import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import Slider from "material-ui/Slider";
import styled from "styled-components";
import MdAccountBox from "react-icons/lib/md/account-box";
//REDUX
import { connect } from "react-redux";
import { changeVotePower } from "../actions/steemActions";
const StyledDiv = styled.div`
  a {
    color: black;
  }
`;

class ProfileMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      votingWeight: 10000
    };
    this.handleVotingSlider = this.handleVotingSlider.bind(this);
    this.handleVotingSliderDragStop = this.handleVotingSliderDragStop.bind(
      this
    );
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });
  handleVotingSlider(e, value) {
    this.setState({
      votingWeight: 10000 * value
    });
  }
  handleVotingSliderDragStop() {
    this.props.changeVotePower(this.state.votingWeight);
  }
  render() {
    return (
      <StyledDiv>
        <MdAccountBox
          size={32}
          onClick={this.handleToggle}
          className="dashboardIcon"
        />
        <Drawer
          open={this.state.open}
          openSecondary={true}
          docked={false}
          onRequestChange={open => this.setState({ open })}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem onClick={this.logout}>
            <NavLink to="/logout">Logout</NavLink>
          </MenuItem>
          <MenuItem>
            Voting Power: {this.state.votingWeight * 0.01 + "%"}
            <Slider
              step={0.1}
              value={this.state.votingWeight * 0.0001}
              onChange={this.handleVotingSlider}
              onDragStop={this.handleVotingSliderDragStop}
            />
          </MenuItem>
        </Drawer>
      </StyledDiv>
    );
  }
}
const mapStateToProps = state => ({
  votePower: state.votePower
});
export default connect(mapStateToProps, { changeVotePower })(ProfileMenu);
