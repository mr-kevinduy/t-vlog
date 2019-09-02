import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import MarkdownControls from './MarkdownControls';
import Editor from './Editor';
import CodeRender from './renders/CodeRender';
import InlineCodeRender from './renders/InlineCodeRender';
import LinkRender from './renders/LinkRender';
import ImageRender from './renders/ImageRender';

import './index.scss';

class TVlogEditor extends React.PureComponent {
  constructor(props) {
    super(props);

    console.log(props);

    console.log('TVlogEditor constructor');

    this.state = {
      content: '',
      htmlMode: 'raw'
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      content: props.value
    };
  }

  handleMarkdownChange = evt => {
    this.setState({content: evt.target.value});
    this.props.onChange(evt);
  }

  handleControlsChange = mode => {
    this.setState({htmlMode: mode});
  }

  render() {
    return (
      <div className="tvlog-poster">
        <div className="tvlog-poster__editor">
          <div className="tvlog-poster__editor--controls markdown-controls">
            <fieldset>
              <label htmlFor="raw-html" className="pure-checkbox">
                Raw&nbsp;
              </label>

              <label htmlFor="escape-html" className="pure-checkbox">
                Escape&nbsp;
              </label>

              <label htmlFor="skip-html" className="pure-checkbox">
                Skip&nbsp;
              </label>
            </fieldset>
          </div>
          <Editor
            className="tvlog-poster__editor--content"
            textAreaClassName="tvlog-poster__editor--textarea"
            value={this.state.content}
            onChange={this.handleMarkdownChange}
          />
        </div>

        <div className="tvlog-poster__preview">
          <MarkdownControls
            onChange={this.handleControlsChange}
            mode={this.state.htmlMode}
          />
          <ReactMarkdown
            className="tvlog-poster__preview--content"
            source={this.state.content}
            skipHtml={this.state.htmlMode === 'skip'}
            escapeHtml={this.state.htmlMode === 'escape'}
            renderers={{
              inlineCode: InlineCodeRender,
              code: CodeRender,
              link: LinkRender,
              image: ImageRender,
            }}
          />
        </div>
      </div>
    );
  }
}

TVlogEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};

export default TVlogEditor;
