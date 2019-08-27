import React from 'react';
import JSX from './jsx';
// import RenderElements from './render-elements';
import StateAndLifecycle from './state-and-lifecycle';
import AdContext from './advanced-context';
import { ReverseName } from './HOC';

class Docs extends React.Component {
  render() {
    return (
      <div className="docs" style={{ padding: '50px', background: '#eee' }}>
        <h3>This is docs:</h3>
        ---------------------------
        01
        ---------------------------
        <JSX />

        ---------------------------
        02
        ---------------------------
        <StateAndLifecycle />

        ---------------------------
        03
        ---------------------------
        <AdContext />

        <ReverseName>Hello</ReverseName>

      </div>
    );
  }
}

export default Docs;
