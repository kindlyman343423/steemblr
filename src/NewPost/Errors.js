import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
const Container = styled.div`
  color: red;
  font-weight: bold;
  padding-left: 30px;
`;
export default class Errors extends Component {
  render() {
    return (
      <Container>
        {this.props.error.error_description !== undefined &&
          this.props.error.error_description}
        {this.props.error}
      </Container>
    );
  }
}
Errors.propTypes = {
  error: PropTypes.string
};
