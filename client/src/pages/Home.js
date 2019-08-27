import React from 'react';
import axios from "axios";
import FullLayout from '../layouts/FullLayout';
import Demo from '../plugins/react-markdown/Demo';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: '',
      data: {
        title: '',
        content: ''
      }
    }
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    axios.post("/api/posts/create", { payload: this.state.data }).then(res => {
      console.log("Create success!!");
      return res.data.payload
    });
  }

  render() {
    return (
      <FullLayout title="Home page" description="This is home page.">
        <div className="content-page home-page">
          <div className="w-full px-3 mx-auto">
            <form className="bg-white pt-6 pb-8 mb-4" onSubmit={this.handleSubmit}>
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
                  placeholder="Type a title"
                  onChange={this.onChange}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Content:</label>
                <Demo />
              </div>
            </form>
          </div>
        </div>
      </FullLayout>
    );
  }
}

export default HomePage;
