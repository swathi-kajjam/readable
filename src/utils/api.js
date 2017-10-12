const api = process.env.REACT_APP_BACKEND || 'http://localhost:3001';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)


const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

//Category API Methods
export const getAllCategories = () =>
    fetch(`${api}/categories`, {headers} )
        .then(res =>  res.json())
        .then(data => data.categories);

//Post API Methods
export const getAllPosts = () =>
    fetch(`${api}/posts`, {headers})
        .then(res => res.json())

export const addPost = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers:{
            ...headers,
            'Content-Type': 'application-json'
        },
        body: JSON.stringify(post)
    }).then(res => res.json())

export const updatePost = (post) =>
    fetch(`${api}/posts/${post.id}`, {
        method:'PUT',
        headers:{
            ...headers,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(post)})
        .then(res => res.json())

export const deletePost = (id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers
    }).then(res => res.json())

// Comment API Methods
export const getComments = (id) =>
    fetch(`${api}/posts/${id}/comments`, {headers})
        .then(res => res.json())

export const addComment = (comment) =>
    fetch(`${api}/comments`, {
        method:'POST',
        headers:{
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(res => res.json())

export const updateComment = (comment) =>
    fetch(`${api}/comments/${comment.id}`, {
        method:'PUT',
        headers:{
            ...headers,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(comment)})
        .then(res => res.json())

export const deleteComment = (id) =>
    fetch(`${api}/comments/${id}`, {
        method: 'DELETE',
        headers
    }).then(res => res.json())

