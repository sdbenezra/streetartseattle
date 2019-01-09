import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Street Art Seattle
        </header>
        <Dashboard />
      </div>
    );
  }
}

export default App;
