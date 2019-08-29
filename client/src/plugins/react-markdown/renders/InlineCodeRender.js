import React from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlightjs';

import 'highlightjs/styles/github.css';

class InlineCodeRender extends React.Component {
  constructor(props) {
    super(props);

    this.setRef = this.setRef.bind(this);
  }

  setRef(el) {
    this.codeEl = el;
  }

  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    hljs.highlightBlock(this.codeEl);
  }

  render() {
    return (
      <code ref={this.setRef} className={`language-${this.props.language}`}>
        {this.props.value}
      </code>
    )
  }
}

InlineCodeRender.defaultProps = {
  value: '',
  language: ''
};

InlineCodeRender.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string
};

export default InlineCodeRender;
