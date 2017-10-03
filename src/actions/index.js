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