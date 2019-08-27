import React from 'react';

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

class JSX extends React.Component {
  render() {
    const user = {
      firstName: 'Kevin',
      lastName: 'Duy'
    };

    const element = (
      <h1>Hello, {formatName(user)}!</h1>
    );

    return (
      <div>
        {element}
      </div>
    );
  }
}

export default JSX;
