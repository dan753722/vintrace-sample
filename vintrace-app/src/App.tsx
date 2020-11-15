import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";
import styled from 'styled-components';
import logo from './logo.svg';
import './App.css';

import WineDetailsContainer from './WineDetailsContainer';

const AppContainer = styled.div`
  margin: auto;
  margin-top: 142px;
  width: 50%;
  background: transparent;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Route path="/wines/:lotCode" component={WineDetailsContainer} />
      </AppContainer>

      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div> */}
    </Router>
  );
}

export default App;
