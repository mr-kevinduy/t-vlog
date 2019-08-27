import React from 'react';
import PropTypes from 'prop-types';
import CodeMirrorEditor from './CodeMirrorEditor';

function Editor(props) {
  return (
    <CodeMirrorEditor
      mode="markdown"
      theme="t-vlog"
      value={props.value}
      onChange={props.onChange}
    />
  )
}

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};

Editor.defaultProps = {
  value: ''
};

export default Editor;