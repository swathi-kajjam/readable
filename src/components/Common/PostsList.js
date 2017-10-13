import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {orderBy} from 'lodash';
import VotingView from '../VotingView';

class PostsList extends Component{
    constructor(props, context){
        super(props);

        this.state = {
            value:'voteScore',
            category: this.props.category || ''
        }
    }

    handleChange = (e) =>{
        this.setState({value:e.target.value})
    }

    render() {

        const posts = orderBy(this.props.posts.filter(post=> post.deleted === false), this.state.value, ['desc']),
              category = this.state.category;

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
                        <Link key={post.id} to={`/${post.category}/${post.id}`}>
                            <li className='posts-list-item'>
                                {post.title} <VotingView isPosts={true} voteScore={post.voteScore} id={post.id}/>
                            </li>
                        </Link>
                    ))}
                </ul>

                {category && <Link to={`${category}/post/new`}> Add Post </Link>}
            </div>
        )
    }
}

export default PostsList;