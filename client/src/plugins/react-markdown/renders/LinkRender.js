import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class LinkRender extends React.Component {
  render() {
    if (this.props.href.match(/^(https?:)?\/\//)) {
      return (
        <a href={this.props.href} target="_blank" rel="noopener noreferrer">
          {this.props.children} <sup>☁</sup>
        </a>
      );
    }

    return <Link to={this.props.href}>{this.props.children}</Link>;
  }
}

LinkRender.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string
};

export default LinkRender;

