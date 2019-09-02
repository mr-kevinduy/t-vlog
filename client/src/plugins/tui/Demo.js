import React from 'react';
import axios from "axios";
import $ from 'jquery';
import { Editor } from '@toast-ui/react-editor';
import FullLayout from '../../layouts/FullLayout';

import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.min.css';
import 'tui-editor/dist/tui-editor-contents.min.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'tui-chart/dist/tui-chart.css';

// Custom style
import './index.scss';

// import 'tui-editor/dist/tui-editor-extChart.min';
import 'tui-editor/dist/tui-editor-extColorSyntax.min';
import 'tui-editor/dist/tui-editor-extScrollSync.min';
import 'tui-editor/dist/tui-editor-extTable.min';
import 'tui-editor/dist/tui-editor-extUML.min';
import 'raphael/raphael.js';
import 'tui-chart/dist/tui-chart-polyfill';
import 'tui-editor/dist/tui-editor-extChart';

// Custom extensions
import './extensions/youtube';

import { initialSource } from '../data';

class TUIEditorDemo extends React.Component {
  constructor(props) {
    super(props);

    let id = '';

    this.editorRef = React.createRef();
    this.editor = null;
    this.toolbar = null;

    if (
      'params' in props.match &&
      props.match.params &&
      'id' in props.match.params
    ) {
      id = props.match.params.id;
    }

    this.state = {
      id,
      data: {
        title: '',
        content: initialSource
      }
    }
  }

  componentDidMount() {
    const { id } = this.state;

    this.setEditorInstance();
    this.setEditorToolbarInstance();
    this.addToolbars();

    if (id !== '') {
      axios.get(`/api/v1/posts/${id}`).then(res => {
        const { title, content } = res.data.payload;
        this.setState({
          ...this.state,
          data: { ...this.state.data, content, title }
        });
      });
    }
  }

  handleChange = e => {
    let { name, value } = e.target;

    this.setState({
      ...this.state,
      data: { ...this.state.data, [name]: value }
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    const { id, data } = this.state;

    if (id !== '') {
      // Update post
      axios.post(`/api/v1/posts/${id}/edit`, { payload: data }).then(res => {
        console.log("Update success!!", res);
        return res.data.payload
      });
    } else {
      // Create new post
      axios.post("/api/v1/posts/create", { payload: data }).then(res => {
        console.log("Create success!!", res);
        return res.data.payload
      });
    }
  }

  setEditorInstance = () => {
    this.editor = this.editorRef.current.getInstance();
  }

  setEditorToolbarInstance = () => {
    this.toolbar = this.editor.getUI().getToolbar();
  }

  addToolbars = () => {
    const ytshortCode = `
\`\`\`youtube
XGSy3_Czz8k
\`\`\`
`;

    this.addCustomizeDivider();
    this.addCustomizeButton('youtube', '<i class="fab fa-youtube"></i>', 'Youtube!!!', () => {
      this.editor.insertText(ytshortCode);
    });
    // this.addCustomizeButton('apple', '<i class="fab fa-apple"></i>', 'Apple!!!', 'Bold');
    this.addCustomizeButton('fullscreen', '<i class="fas fa-expand"></i>', 'Fullscreen', () => {
      $(".tui-editor-defaultUI").toggleClass("is-fullscreen");
    });
  }

  createCustomizeElement = (className, content, tag = 'button') => {
    return $(`<${tag} class="tui-toolbar__customize ${className}">${content}</${tag}>`);
  }

  addCustomizeEvent = (name, callback) => {
    this.editor.eventManager.addEventType(name);
    this.editor.eventManager.listen(name, callback);
  }

  addCustomizeDivider = () => {
    this.toolbar.addDivider();
  }

  addCustomizeButton = (name, content, tooltip = '', execute = null) => {
    let options = {
      name: 'customize-' + name,
      tooltip: tooltip,
      $el: this.createCustomizeElement('customize-' + name, content)
    };

    if (execute && typeof execute === 'function') {
      this.addCustomizeEvent(name, execute);

      options = Object.assign({}, options, {event: name});
    } else if (execute && typeof execute === 'string') {
      options = Object.assign({}, options, {command: execute});
    }

    this.toolbar.addButton(options);
  }

  render() {
    const { data } = this.state;
    return (
      <FullLayout title="Home page" description="This is home page.">
        <div className="content-page home-page">
          <div className="w-full px-3 mx-auto">
            <form className="bg-white pt-6 pb-8 mb-4" onSubmit={ this.handleSubmit }>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >Post</button>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  name="title"
                  type="text"
                  value={ data.title }
                  placeholder="Type a title"
                  onChange={ this.handleChange }
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Content:</label>
                <Editor
                  ref={this.editorRef}
                  initialValue={ data.content }
                  previewStyle="vertical"
                  height="600px"
                  initialEditType="markdown"
                  useCommandShortcut={true}
                  toolbarItems={[
                    'heading',
                    'bold',
                    'italic',
                    'strike',
                    'divider',
                    'hr',
                    'quote',
                    'divider',
                    'ul',
                    'ol',
                    'task',
                    'indent',
                    'outdent',
                    'divider',
                    'table',
                    'image',
                    'link',
                    'divider',
                    'code',
                    'codeblock'
                  ]}
                  exts={[
                    {
                      name: 'chart',
                      minWidth: 100,
                      maxWidth: 600,
                      minHeight: 100,
                      maxHeight: 300
                    },
                    'scrollSync',
                    'colorSyntax',
                    'uml',
                    'mark',
                    'table',
                    'youtube'
                  ]}
                />
              </div>
            </form>
          </div>
        </div>
      </FullLayout>
    );
  }
}

export default TUIEditorDemo;
