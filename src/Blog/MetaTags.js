import React, { Component } from "react";
import { Helmet } from "react-helmet";

export default class MetaTags extends Component {
  render() {
    return (
      <Helmet>
        <html lang="en" amp />
        <title>
          {this.props.account.seo !== undefined
            ? this.props.account.seo.title
            : this.props.account.name + " blog"}
        </title>
        <meta name="author" content={this.props.account.author} />
        <meta
          name="description"
          content={
            this.props.account.seo !== undefined
              ? this.props.account.seo.description
              : this.props.account.about
          }
        />
      </Helmet>
    );
  }
}
