const api = process.env.REACT_APP_BACKEND || 'http://localhost:3001';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)


const headers = {
    'Accept': 'application/json',
    'Authorization': token
}


export const getCategories = () =>
    fetch(`${api}/categories`, {headers} )
        .then( (res) => { return(res.text()) })
        .then((data) => data.categories);


export const getAllPosts = () =>
    fetch(`${api}/posts`, {headers})
        .then(res => res.json())


