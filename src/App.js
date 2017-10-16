import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import CategoryList from './components/Common/CategoryList';
import DefaultView from './components/DefaultView';
import CategoryView from './components/CategoryView';
import CreateEditPostView from './components/CreateEditPostView';
import PostDetailView from './components/PostDetailView';

class App extends Component {
  render() {
    return (
        <div className="App">
            <CategoryList />
            <Route exact path="/:category/:post_id" component={PostDetailView} />
            <Route exact path="/:category/post/new" component={CreateEditPostView} />
            <Route exact path="/:category/:post_id/Edit" component={CreateEditPostView} />

            <Route exact path='/' component={DefaultView}/>
            <Route exact path='/:category' component={CategoryView}/>
        </div>
    );
  }
}

export default App;
