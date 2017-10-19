import * as ActionTypes from './ActionTypes';
import * as readableAPI from '../utils/api';

//Default View Actions
export const receiveCategories = categories => ({
    type: ActionTypes.RECEIVE_CATEGORIES,
    categories
})

export const receiveAllPosts = posts => ({
    type: ActionTypes.RECEIVE_ALL_POSTS,
    posts
})

export const receiveAllComments = (comments, postId) => ({
    type: ActionTypes.RECEIVE_COMMENTS,
    comments,
    postId
})

//Post Actions
export const addPostInStore = post => ({
    type: ActionTypes.ADD_POST,
    post
})

export const updatePostInStore = post => ({
    type: ActionTypes.UPDATE_POST,
    post
})

export const deletePostInStore = id => ({
    type: ActionTypes.DELETE_POST,
    id
})

export const updatePostVoteInStore = post => ({
    type: ActionTypes.UPDATE_POST_VOTE,
    post
})

//Comment Actions
export const addCommentInStore = comment => ({
    type: ActionTypes.ADD_COMMENT,
    comment
})

export const updateCommentInStore = comment => ({
    type: ActionTypes.UPDATE_COMMENT,
    comment
})

export const deleteCommentInStore = (id, parentId) => ({
    type: ActionTypes.DELETE_COMMENT,
    id,
    parentId
})

export const updateCommenVoteInStore = comment => ({
    type: ActionTypes.UPDATE_COMMENT_VOTE,
    comment
})

//Thunk methods
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
            dispatch(receiveAllCommentsForPosts(posts))
        })
}

export const receiveAllCommentsForPosts = posts => dispatch => {
    posts.forEach(post => {
        dispatch(getComments(post.id))
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

export const updatePostVoting = (id, option) => dispatch => {
    readableAPI.updatePostVoting(id, option)
        .then(post => dispatch(updatePostVoteInStore(post)))
}

export const getComments = (id) => dispatch => {
    readableAPI.getComments(id)
        .then(comments => {
            dispatch(receiveAllComments(comments, id))
        })
}

export const addComment = (comment) => dispatch => {
    readableAPI.addComment(comment)
        .then(comment => dispatch(addCommentInStore(comment)))
}

export const updateComment = (comment) => dispatch => {
    readableAPI.updateComment(comment)
        .then(comment => dispatch(updateCommentInStore(comment)))
}

export const deleteComment = (id) => dispatch => {
    readableAPI.deleteComment(id)
        .then(comment => dispatch(deleteCommentInStore(id, comment.parentId)))
}

export const updateCommentVoting = (id, option) => dispatch => {
    readableAPI.updateCommentVoting(id, option)
        .then(cmnt => dispatch(updateCommenVoteInStore(cmnt)))
}