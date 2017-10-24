import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {orderBy} from 'lodash';
import VotingView from '../VotingView';
import {connect} from 'react-redux';
import {deletePost, deleteComment} from '../../actions';

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

    deletePost = (event, post) => {
        this.props.deletePostDetail(post.id);
        post.comments.map(comment => {
            return this.props.deleteCommentDetail(comment.id);
        })
        event.preventDefault();
    }

    render() {
        const posts = orderBy(this.props.posts.filter(post=> post.deleted === false), this.state.value, ['desc'])
        const addPostLink = this.props.category? `${this.props.category}/post/new` : '/post/new';

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
                            <Link to={`/${post.category}/${post.id}`}>Detail</Link>
                            <Link to={`/${post.category}/${post.id}/Edit`}>Edit</Link>
                            <Link to='#' onClick={(event) => this.deletePost(event, post)}> Delete </Link>
                        </div>
                    </div>
                ))}

               <Link to={addPostLink}> <div className="btn"> Add Post </div></Link>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        deletePostDetail: (id) => {
            dispatch(deletePost(id))
        },
        deleteCommentDetail:(id)=> {
            dispatch(deleteComment(id));
        }
    }
}

export default connect(null, mapDispatchToProps)(PostsList);