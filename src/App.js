import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as readableAPI from './utils/api';

class App extends Component {

    state = {
        categories:[]
    }

  componentDidMount(){
      readableAPI.getCategories().then(categories => {
          this.setState({categories})
      })
  }

  render() {
    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to React</h2>
            </div>
            <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            <p>
                Talking to the backend yields these categories: <br/>
                {this.state.backend}
            </p>
        </div>
    );
  }
}

export default App;
