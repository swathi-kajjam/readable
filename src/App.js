import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DefaultView from './components/Default';

class App extends Component {
  render() {
    return (
        <div className="App">
           <DefaultView />
        </div>
    );
  }
}

export default App;
