import React from 'react';

class StateAndLifecycle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    console.log('componentDidMount');

    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    console.log('ComponentWillUnmount');

    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    const { date } = this.state;

    const numbers = [2, 4, 5, 1];
    const listItems = numbers.map((number, index) => <li key={index}>{ number * 2 }</li>);

    return (
      <div>
        <span>Timer:</span>
        <h1>{ date.toLocaleTimeString() }</h1>
        <ul>
          { listItems }
        </ul>
      </div>
    );
  }
}

export default StateAndLifecycle;
