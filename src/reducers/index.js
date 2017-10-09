import * as actionTypes from '../actions/ActionTypes';
import {combineReducers} from 'redux';
import {assign} from'lodash';

const initialState = {
    categories: [],
    posts:[],
    comments:[]
}

function appReducer(state = initialState, action){
    let posts;
    switch(action.type){
        case actionTypes.RECEIVE_CATEGORIES:
            return assign({}, state, {categories: action.categories})
        case actionTypes.RECEIVE_ALL_POSTS:
            return assign({}, state, {posts: action.posts})
        case actionTypes.RECEIVE_COMMENTS:
            return assign({}, state, {comments: action.comments})
        case actionTypes.UPDATE_POST:
            posts = state.posts
            posts.filter(post => post.id !== action.post.id).concat(action.post);
            return assign({}, state, {
                posts: posts
            });
        case actionTypes.DELETE_POST:
            const post = state.posts.find(post => post.id === action.id);
            post.deleted = true
            return assign({}, state, {
                posts: state.posts.filter(post => post.id !== action.id).concat(post)
            })
        default:
            return state;
    }
}


export default combineReducers({appReducer});