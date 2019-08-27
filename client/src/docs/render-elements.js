import React from 'react';

function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />

  );
}

class RenderElements extends React.Component {
  constructor(props) {
    super(props);

    console.log('RenderElements: constructor');

    this.state = {
      counter: 0,
      user: {
        name: 'KevinDuy',
        avatarUrl: 'https://via.placeholder.com/150'
      }
    };
  }

  componentDidMount() {
    console.log('RenderElements: componentDidMount');
    this.counterId = setInterval(() => {
      this.setState((state) => ({
        counter: state.counter + 1
      }));
    }, 1000);
  }

  componentWillUnmount() {
    console.log('RenderElements: componentWillUnmount');
    clearInterval(this.counterId);
  }

  setUser(user) {
    this.setState({ user: user });
  }

  render() {
    console.log('RenderElements: render');
    const element = <Avatar user={this.state.user} />;
    return (
      <div>
        <button onClick={() => this.setUser({ name: 'XXX', avatarUrl: 'https://via.placeholder.com/180' })}>Change User</button>
        <h1>{ this.state.counter }</h1>
        { element }
      </div>
    );
  }
}

export default RenderElements;
