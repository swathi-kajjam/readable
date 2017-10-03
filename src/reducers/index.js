import * as actionTypes from '../actions/ActionTypes';
import {combineReducers} from 'redux';
import {assign} from'lodash';

const initialState = {
    categories: [],
    posts:[]
}

function defaultViewReducer(state = initialState, action){
    switch(action.type){
        case actionTypes.RECEIVE_CATEGORIES:
            return assign({}, state, {categories: action.categories})
        case actionTypes.RECEIVE_ALL_POSTS:
            return assign({}, state, {posts: action.posts})
        default:
            return state;
    }
}

export default combineReducers({defaultViewReducer});