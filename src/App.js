import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import DefaultView from './components/Default';
import CategoryView from './components/CategoryView';

class App extends Component {
  render() {
    return (
        <div className="App">
            <Route exact path='/' render={()=>
                <DefaultView />
            }/>
            <Route path='/addPost' render={()=>
                <CategoryView />
            }/>
        </div>
    );
  }
}

export default App;
