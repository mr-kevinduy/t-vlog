import React from 'react';
import axios from "axios";
import FullLayout from '../../pages/layouts/FullLayout';
import TVlogEditor from './TVlogEditor';

import { initialSource } from '../data';

class ReactMarkdownDemo extends React.Component {
  constructor(props) {
    super(props);

    let id = '';

    console.log(props);

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
                <TVlogEditor onChange={ this.handleChange } value={ data.content }/>
              </div>
            </form>
          </div>
        </div>
      </FullLayout>
    );
  }
}

export default ReactMarkdownDemo;
