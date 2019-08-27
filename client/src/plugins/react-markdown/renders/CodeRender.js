import React from 'react';
import PropTypes from 'prop-types';
import Lowlight from 'react-lowlight';
import shallowCompare from 'react-addons-shallow-compare';
import js from 'highlight.js/lib/languages/javascript';

import 'highlightjs/styles/github.css';

Lowlight.registerLanguage('js', js);

class CodeRender extends React.Component {
  constructor(props) {
    super(props);

    this.setRef = this.setRef.bind(this);
  }

  setRef(el) {
    this.codeEl = el;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <Lowlight
        language={this.props.language || 'js'}
        value={this.props.value}
        inline={this.props.inline}
      />
    )
  }
}

CodeRender.defaultProps = {
  language: ''
};

CodeRender.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string,
  inline: PropTypes.bool
};

export default CodeRender;
