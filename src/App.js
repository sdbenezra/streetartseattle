import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span className="App-header_text">Street Art Seattle</span>
        </header>
        <Dashboard />
      </div>
    );
  }
}

export default App;
