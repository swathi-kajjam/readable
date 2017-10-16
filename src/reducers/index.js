import * as actionTypes from '../actions/ActionTypes';
import {combineReducers} from 'redux';
import {assign} from'lodash';

const initialState = {
    categories: [],
    posts:[]
}

function appReducer(state = initialState, action){
    let post, posts;
    switch(action.type){
        case actionTypes.RECEIVE_CATEGORIES:
            return assign({}, state, {categories: action.categories});
        case actionTypes.RECEIVE_ALL_POSTS:
            return assign({}, state, {posts: action.posts})
        case actionTypes.RECEIVE_COMMENTS:
            post = state.posts.find(post => post.id === action.postId)
            post.comments = action.comments;
            posts = state.posts.filter(post => post.id !== action.postId).concat(post);
            return assign({}, state, {posts: posts})
        case actionTypes.UPDATE_POST:
            return assign({}, state, {
                posts: state.posts.filter(post => post.id !== action.post.id).concat(action.post)
            });
        case actionTypes.UPDATE_POST_VOTE:
            posts = state.posts.map(post => {
                if(post.id === action.post.id){
                    post.voteScore = action.post.voteScore
                }
                return post
            });
            return assign({}, state, {
                posts
            })
        case actionTypes.UPDATE_COMMENT_VOTE:
            posts = state.posts.map(post => {
                if(post.id === action.comment.parentId){
                    post.comments.map(comment => {
                        if(comment.id === action.comment.id){
                            comment.voteScore = action.comment.voteScore
                        }
                        return comment;
                    })
                }
                return post;
            })

            return assign({}, state, {
                posts
            })
        case actionTypes.DELETE_POST:
            post = state.posts.find(post => post.id === action.id);
            post.deleted = true
            return assign({}, state, {
                posts: state.posts.filter(post => post.id !== action.id).concat(post)
            })
        case actionTypes.ADD_COMMENT:
            posts = state.posts.map(post => {
                if(post.id === action.comment.parentId) {
                    post.comments.push(action.comment)
                }
                return post;
            })

            return assign({}, state, {
                posts
            })
        case actionTypes.UPDATE_COMMENT:
            posts = state.posts.map(post => {
                if(post.id === action.comment.parentId) {
                    post.comments.filter(comment => comment.id!== action.comment.id).concat(action.comment)
                }
                return post;
            })

            return assign({}, state, {
                posts
            })
        case actionTypes.DELETE_COMMENT:
            posts = state.posts.map(post => {
                if(post.id === action.parentId){
                    post.comments.map(comment => {
                        if(comment.id === action.id){
                            comment.deleted = true
                        }
                        return comment;
                    })
                }
                return post;
            })

            return assign({}, state, {
                posts
            })
        case actionTypes.ADD_POST:
            assign({}, state, {
                posts: state.posts.concat(action.post)
            })
        default:
            return state;
    }
}


export default combineReducers({appReducer});