const api = process.env.REACT_APP_BACKEND || 'http://localhost:3001';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)


const headers = {
    'Accept': 'application/json',
    'Authorization': token
}


export const getAllCategories = () =>
    fetch(`${api}/categories`, {headers} )
        .then(res =>  res.json())
        .then(data => data.categories);


export const getAllPosts = () =>
    fetch(`${api}/posts`, {headers})
        .then(res => res.json())


export const getComments = (id) =>
    fetch(`${api}/posts/${id}/comments`, {headers})
        .then(res => res.json())


