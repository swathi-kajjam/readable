import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {orderBy} from 'lodash';
import VotingView from '../VotingView';

/**
 * PostsList - Lists all the posts
 */
class PostsList extends Component{
    constructor(props, context){
        super(props);

        this.state = {
            value:'voteScore'
        }
    }

    /**
     * @description - handle sortBy Date / Score
     * @param e - click event
     */
    sortBy = (e) =>{
        this.setState({value:e.target.getAttribute('value')})
    }

    /**
     * @description - handle sortBy Date / Score
     * @param post - comments existing for a post
     * @returns total comments associated with a post
     */
    getCommentsCount = (post) => {
        let totalComments = 0;
        let comments = post.comments || [];
        if(comments.length >0){
            totalComments = comments.filter(comment => comment.deleted === false).length
        }
        return totalComments;
    }

    render() {
        const posts = orderBy(this.props.posts.filter(post=> post.deleted === false), this.state.value, ['desc'])
        return (
           <div>

               {(posts.length > 1) && (
                   <div>
                       <a className="waves-effect waves-light btn" value='timestamp' onClick={this.sortBy}>Date</a>
                       <a className="waves-effect waves-light btn" value='voteScore' onClick={this.sortBy}>Score</a>
                   </div>
               )}

                {posts.map(post => (

                    <div key={post.id} className="card blue-grey darken-1">
                        <div className="card-content white">
                            <span className="card-title">   <span className='author'>{post.author} : </span> {post.title}
                            <span className="comments-nbr">Comments:{this.getCommentsCount(post)}</span></span>
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