import React from 'react';
import { Link } from 'react-router-dom';
import FullLayout from '../layouts/FullLayout';

class HomePage extends React.Component {
  render() {
    return (
      <FullLayout title="Home page" description="This is home page.">
        <div className="content-page home-page">
          <div className="w-full px-3 mx-auto">
            <div className="bg-white pt-6 pb-8 mb-4">
              <h1>Demo:</h1>
              <ul>
                <li>
                  <Link to="/react-markdown" className="nav-link">React Markdown</Link>
                </li>
                <li>
                  <Link to="/tui" className="nav-link">TUI Editor</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </FullLayout>
    );
  }
}

export default HomePage;
