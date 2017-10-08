import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {orderBy} from 'lodash';

class PostsList extends Component{
    constructor(props, context){
        super(props);
        this.state = {
            value:'voteScore'
        }
    }

    handleChange = (e) =>{
        this.setState({value:e.target.value})
    }

    render() {
        const posts = orderBy(this.props.posts, this.state.value, ['desc'])
        return (
            <div className="flex-item">
                <h1> Posts </h1>
                <div>
                    Sort By: <select value={this.state.value} onChange={this.handleChange}>
                                <option value='timestamp'> TimeStamp </option>
                                <option value='voteScore'> VoteScore </option>
                             </select>
                </div>
                <ul className='posts-list'>
                    {posts.map(post => (
                        <Link key={post.id} to={`/post/${post.id}`}> <li className='posts-list-item'> {post.title}</li></Link>
                    ))}
                </ul>
                <Link to="/addPost"> Add Post </Link>
            </div>
        )
    }
}

export default PostsList;