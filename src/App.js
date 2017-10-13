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
            <Route exact path="/:category/post/new" component={CreateEditPostView} />
            <Route exact path="/:category/:post_id/Edit" component={CreateEditPostView} />
            <Route exact path="/:category/:post_id" component={PostDetailView} />
            <Route exact path='/' component={DefaultView}/>
            <Route exact path='/:category' component={CategoryView}/>
        </div>
    );
  }
}

export default App;
