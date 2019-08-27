import React from 'react';
import MainLayout from '../../layouts/MainLayout';

class Error404 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: ''
    }
  }

  render() {
    return (
      <MainLayout>
        <div className="content-page error-page error-404">
          Not found!
        </div>
      </MainLayout>
    );
  }
}

export default Error404;
