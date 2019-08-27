import React from 'react';
import { withRouter } from 'react-router';
import Meta from '../common/Meta';
import Header from '../common/Header';

class MainLayout extends React.Component {
  render() {
    const { children, id, className, ...rest } = this.props;

    return (
      <div id={id} className={className ? `main-layout ${className}` : `main-layout`}>
        <Meta pathname={this.props.location.pathname} {...rest} />
        <Header />
        <div className="site-content">
          <div className="container">
            { children }
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MainLayout);
