import React from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlightjs';

import 'highlightjs/styles/github.css';

class CodeBlock extends React.Component {
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
      <pre>
        <code ref={this.setRef} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
    )
  }
}

CodeBlock.defaultProps = {
  language: ''
};

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string
};

export default CodeBlock;
