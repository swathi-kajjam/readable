import * as actionTypes from '../actions/ActionTypes';
import {combineReducers} from 'redux';

const initialState = {
    activeCategory: 'all',
    categories: [],
    posts:[]
}

/**
 * appReducer - Reducer for the app
 */
function appReducer(state = initialState, action){
    switch(action.type){
        case actionTypes.SET_ACTIVE_CATEGORY:
            return {...state, activeCategory: action.category}
        case actionTypes.RECEIVE_CATEGORIES:
            return {...state, categories: action.categories}
        case actionTypes.RECEIVE_ALL_POSTS:
            return {...state, posts:action.posts}
        case actionTypes.RECEIVE_COMMENTS:
            return {
                ...state,
                posts: [...state.posts.map(post => {
                    if (post.id === action.postId) {
                        return {...post, comments: action.comments}
                    }
                    return {...post}
                })]
            }
        case actionTypes.UPDATE_POST:
            return {
                ...state,
                posts: [...state.posts.map(post => {
                            if(post.id === action.post.id){
                                return action.post
                            }
                            return {...post}
                        })]
            }
        case actionTypes.UPDATE_POST_VOTE:
            return {
                ...state,
                posts:[...state.posts.map(post => {
                    if(post.id === action.post.id){
                        return {...post, voteScore:action.post.voteScore}
                    }
                    return {...post}
                })]
            }
        case actionTypes.UPDATE_COMMENT_VOTE:
            return {
                ...state,
                posts: [...state.posts.map(post => {
                    if(post.id === action.comment.parentId){
                        return {...post, comments: post.comments.map(comment => {
                                                                        if(comment.id === action.comment.id){
                                                                            return {...comment, voteScore:action.comment.voteScore}
                                                                        }
                                                                        return {...comment}
                                                                    })}
                    }
                    return {...post}
                })]
            }
        case actionTypes.DELETE_POST:
            return {
                ...state,
                posts: [...state.posts.map(post => {
                    if(post.id === action.id){
                        return {...post, deleted:true}
                    }
                    return {...post}
                })]
            }
        case actionTypes.ADD_COMMENT:
            return {
                ...state,
                posts:[ ...state.posts.map(post => {
                    if(post.id === action.comment.parentId){
                        return {...post, comments:[...post.comments, action.comment]}
                    }
                    return {...post}
                })]
            }
        case actionTypes.UPDATE_COMMENT:
            return {
                ...state,
                posts:[ ...state.posts.map(post => {
                        if(post.id === action.comment.parentId){
                            return {...post, comments: post.comments.map(comment=> {
                                                            if(comment.id === action.id){
                                                                return action.comment
                                                            }
                                                            return {...comment}
                                                        })}
                        }
                        return {...post}
                    })]
            }
        case actionTypes.DELETE_COMMENT:
            return{
                ...state,
                posts: [...state.posts.map(post => {
                    if(post.id === action.parentId){

                        return {...post, comments: post.comments.map(comment => {
                                                        if(comment.id === action.id){
                                                            return {...comment, deleted:true}
                                                        }
                                                        return {...comment}
                                                    })
                        }
                    }
                    return {...post}
                })]
            }
        case actionTypes.ADD_POST:
            return {
                ...state,
                posts:[...state.posts, action.post]
            }
        default:
            return state;
    }
}


export default combineReducers({appReducer});