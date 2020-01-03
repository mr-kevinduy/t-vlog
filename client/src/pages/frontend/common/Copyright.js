import React from 'react';

class Copyright extends React.Component {
  render() {
    const { className } = this.props;

    return (
      <p className={className ? `copyright text-gray-500 ${className}` : `copyright text-gray-500`}>&copy;2019 T-Vlog. All rights reserved.</p>
    );
  }
}

export default Copyright;
