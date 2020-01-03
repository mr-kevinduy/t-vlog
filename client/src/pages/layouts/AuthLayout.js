import React from 'react';
import { withRouter } from 'react-router';
import Meta from '../common/Meta';
import Header from '../frontend/common/Header';

class AuthLayout extends React.Component {
  render() {
    const { children, id, className, ...rest } = this.props;

    return (
      <div id={id} className={className ? `auth-layout bg-color ${className}` : `auth-layout bg-color`}>
        <Meta pathname={this.props.location.pathname} {...rest} />
        <Header />
        <div className="site-content">
          <div className="container mx-auto p-4 px-3 py-20 flex justify-center align-center">
            { children }
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AuthLayout);
