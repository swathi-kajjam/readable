import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import DefaultView from './components/Default';
import CategoryView from './components/CategoryView';
import CreatePostView from './components/CreatePostView';
import PostDetailView from './components/PostDetailView';

class App extends Component {
  render() {
    return (
        <div className="App">
            <Route exact path='/' component={DefaultView}/>
            <Route exact path='/:category' component={CategoryView}/>
            <Route exact path='/post/:id' component={PostDetailView}/>
            <Route path='/addPost' component={CreatePostView}/>
        </div>
    );
  }
}

export default App;
