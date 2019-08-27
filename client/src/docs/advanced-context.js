import React from 'react';
import { ThemeContext } from './constants/context';
// import { TestContext } from './constants/context';
import Button from './components/context/Button';

class AdContext extends React.Component {
  render() {
    return (
      <div>
        <ThemeContext.Provider value="dark">
          <Toolbar />
        </ThemeContext.Provider>
      </div>
    );
  }
}

function Toolbar(props) {
  return (
    <div className="toolbar">
      Toolbar:
      <Button />
    </div>
  );
}

export default AdContext;
