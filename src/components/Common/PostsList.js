import React from 'react';

function PostsList(props){
    return (
        <div>
            <ul className='posts-list'>
                {props.posts.map(post => (
                    <li className='post-list-item' key={post.id}> {post.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default PostsList;