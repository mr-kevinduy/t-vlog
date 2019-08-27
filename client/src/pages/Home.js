import React from 'react';
import FullLayout from '../layouts/FullLayout';
import Demo from '../plugins/react-markdown/Demo';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: ''
    }
  }

  render() {
    return (
      <FullLayout title="Home page" description="This is home page.">
        <div className="content-page home-page">
          <Demo />
        </div>
      </FullLayout>
    );
  }
}

export default HomePage;
