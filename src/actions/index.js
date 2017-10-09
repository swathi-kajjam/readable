import * as ActionTypes from './ActionTypes';
import * as readableAPI from '../utils/api';

//DEFAULT VIEW
export const receiveCategories = categories => ({
    type: ActionTypes.RECEIVE_CATEGORIES,
    categories
})

export const receiveAllPosts = posts => ({
    type: ActionTypes.RECEIVE_ALL_POSTS,
    posts
})

export const receiveAllComments = comments => ({
    type: ActionTypes.RECEIVE_COMMENTS,
    comments
})

export const updatePostInStore = post => ({
    type: ActionTypes.UPDATE_POST,
    post
})

export const deletePostInStore = id => ({
    type: ActionTypes.DELETE_POST,
    id
})


export const getAllCategories = () => dispatch => {
    readableAPI.getAllCategories()
        .then(categories => {
            dispatch(receiveCategories(categories))
        })
}

export const getAllPosts = () => dispatch => {
    readableAPI.getAllPosts()
        .then(posts => {
            dispatch(receiveAllPosts(posts))
        })
}

export const getComments = (id) => dispatch => {
    readableAPI.getComments(id)
        .then(comments => {
            dispatch(receiveAllComments(comments))
        })
}

export const updatePost = (post) => dispatch => {
    readableAPI.updatePost(post)
        .then(dispatch(updatePostInStore(post)))
}

export const deletePost = (id) => dispatch => {
    readableAPI.deletePost(id)
        .then(dispatch(deletePostInStore(id)))
}