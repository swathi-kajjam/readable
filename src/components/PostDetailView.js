import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getComments} from '../actions';
import {orderBy} from 'lodash';
import {Link} from 'react-router-dom';
import {deletePost} from '../actions';

class PostDetailView extends Component{
    constructor(props, context){
        super(props);
    }

    componentDidMount(){
        this.props.getAllComments(this.props.match.params.id)
    }

    deletePost = (event) => {
        this.props.deletePostDetail(event.target.id);
        event.preventDefault();
    }

    render(){
        const post = this.props.posts.find(post => post.id === this.props.match.params.id);

        return(
            <div className='flex-container'>
                <div className='details post'>
                    <h1>Post Detail View</h1>
                    <div>
                        <Link to={`/EditPost/${post.id}`} className='edit-post'> Edit </Link>
                        <a href='#' id={post.id} onClick={this.deletePost}> Delete </a>
                    </div>
                    <div>
                        <label>Title:</label>
                        <span>{post.title}</span>
                    </div>
                    <div>
                        <label>Body:</label>
                        <span>{post.body}</span>
                    </div>
                    <div>
                        <label>Author:</label>
                        <span>{post.author}</span>
                    </div>
                    <div>
                        <label>Timestamp:</label>
                        <span>{post.timestamp}</span>
                    </div>
                </div>
                <div className='details comments'>
                    <h1>Comments </h1>
                    { (this.props.comments && this.props.comments.length > 0)&&(
                        this.props.comments.map(comment=>(
                            <div key={comment.id}>
                                <label>{comment.author}: </label>
                                <span>{comment.body}</span>
                            </div>
                        )))

                    }

                </div>
            </div>
        )
    }
}


const mapStateToProps = ({appReducer}) => {
    console.log(appReducer.posts)
    return {
        posts:appReducer.posts,
        comments:orderBy(appReducer.comments, 'voteScore', ['desc'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllComments: (id) => {
            dispatch(getComments(id))
        },
        deletePostDetail: (id) => {
            dispatch(deletePost(id))
            window.location = '/'
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);