import React from 'react';
import { ThemeContext } from '../../constants/context';

class Button extends React.Component {
  static contextType = ThemeContext;

  render() {
    return (<button theme={this.context} >Button</button>);
  }
}

export default Button;
