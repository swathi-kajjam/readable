import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import DefaultView from './components/Default';
import CategoryView from './components/CategoryView';
import CreateEditPostView from './components/CreateEditPostView';
import PostDetailView from './components/PostDetailView';

class App extends Component {
  render() {
    return (
        <div className="App">

            <Route exact path='/post/:id' component={PostDetailView}/>
            <Route exact path='/editPost/:id' component={CreateEditPostView}/>
            <Route exact path='/addPost' component={CreateEditPostView}/>
            <Route exact path='/category/:category' component={CategoryView}/>
            <Route exact path='/' component={DefaultView}/>

        </div>
    );
  }
}

export default App;
