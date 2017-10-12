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

export const addCommentInStore = comment => ({
    type: ActionTypes.ADD_COMMENT,
    comment
})

export const updateCommentInStore = comment => ({
    type: ActionTypes.UPDATE_COMMENT,
    comment
})

export const deleteCommentInStore = id => ({
    type: ActionTypes.DELETE_COMMENT,
    id
})

export const addPostInStore = post => ({
    type: ActionTypes.ADD_POST,
    post
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

export const addPost = (post) => dispatch => {
    readableAPI.addPost(post)
        .then(post => dispatch(addPostInStore(post)))
}

export const updatePost = (post) => dispatch => {
    readableAPI.updatePost(post)
        .then(dispatch(updatePostInStore(post)))
}

export const deletePost = (id) => dispatch => {
    readableAPI.deletePost(id)
        .then(dispatch(deletePostInStore(id)))
}

export const getComments = (id) => dispatch => {
    readableAPI.getComments(id)
        .then(comments => {
            dispatch(receiveAllComments(comments))
        })
}

export const addComment = (comment) => dispatch => {
    readableAPI.addComment(comment)
        .then(dispatch(addCommentInStore(comment)))
}

export const updateComment = (comment) => dispatch => {
    readableAPI.updateComment(comment)
        .then(cmnt => dispatch(updateCommentInStore(cmnt)))
}

export const deleteComment = (id) => dispatch => {
    readableAPI.deleteComment(id)
        .then(dispatch(deleteCommentInStore(id)))
}