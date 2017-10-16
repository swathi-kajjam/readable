import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {orderBy} from 'lodash';
import VotingView from '../VotingView';

class PostsList extends Component{
    constructor(props, context){
        super(props);

        this.state = {
            value:'voteScore'
        }
    }

    handleChange = (e) =>{
        this.setState({value:e.target.getAttribute('value')})
    }

    render() {
        const posts = orderBy(this.props.posts.filter(post=> post.deleted === false), this.state.value, ['desc'])
        return (
           <div>

               {(posts.length > 0) && (
                   <div>
                       <a className="waves-effect waves-light btn" value='timestamp' onClick={this.handleChange}>Date</a>
                       <a className="waves-effect waves-light btn" value='voteScore' onClick={this.handleChange}>Score</a>
                   </div>
               )}

                {posts.map(post => (

                    <div key={post.id} className="card blue-grey darken-1">
                        <div className="card-content white">
                            <span className="card-title">   <span className='author'>{post.author} : </span> {post.title} <span className="comments-nbr">Comments:{post.comments && post.comments.length}</span></span>
                             <VotingView isPosts={true} voteScore={post.voteScore} id={post.id}/>

                        </div>
                        <div className="card-action">
                            <Link to={`/${post.category}/${post.id}`}>Edit</Link>
                            <Link to="#">Delete</Link>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default PostsList;