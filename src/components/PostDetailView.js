import React, {Component} from 'react';
import {connect} from 'react-redux';
import {orderBy} from 'lodash';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import serializeForm from 'form-serialize';
import {getComments, deletePost,addComment, updateComment, deleteComment} from '../actions';

class PostDetailView extends Component{
    constructor(props, context){
        super(props);

        this.state = {
            commentsModalOpen: false,
            isCommentEditMode: false,
            commentInEditMode: {},
            category: this.props.match.params.category
        }
    }

    componentDidMount(){
        this.props.getAllComments(this.props.match.params.id)
    }

    openCommentsModalInAddMode = () => {
        this.setState({
            commentsModalOpen: true,
            commentInEditMode: {
                author:'',
                body:'',
                timeStamp: new Date().getTime(),
                id: Math.random().toString(36).substr(-8)
            }
        })
    }

    closeCommentsModal = () => {
        this.setState({commentsModalOpen: false})
    }

    addComment = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, {hash:true});
        if(this.state.isCommentEditMode){
            values.timeStamp = new Date().getTime();
            this.props.updatePostComment(values)
        }else{
            this.props.addNewComment(values)
        }
        this.closeCommentsModal();
    }

    deletePost = (event) => {
        this.props.deletePostDetail(event.target.id);
        event.preventDefault();
    }

    deleteComment = (event) => {
       this.props.deleteCommentDetail(event.target.id);
       event.preventDefault();
    }

    openCommentsModalInEditMode = (event, comment) => {
        this.setState({commentsModalOpen:true, isCommentEditMode:true, commentInEditMode: comment})
    }

    updateCommentState = (event) => {
        const field = event.target.name;
        const comment = this.state.commentInEditMode;
        comment[field] = event.target.value;
        this.setState({commentInEditMode: comment})
    }

    render(){
        const post = this.props.posts.find(post => post.id === this.props.match.params.post_id);
        const {commentInEditMode, isCommentEditMode, category} = this.state;

        let html;

        if(isCommentEditMode === true){
            html =  (
                <div>
                    <span className='comment-author'>{commentInEditMode.author}:</span>
                    <input className='text lrg' name='body' type='text' value={commentInEditMode.body} onChange={this.updateCommentState} placeholder='body'></input>
                    <button className='btn'> Update Comment </button>
                 </div>
            )
        }else{
            html = (
                <div>
                    <div>
                        <label> Author: </label>
                        <input className='text' name='author' type='text' value={commentInEditMode.author} onChange={this.updateCommentState} placeholder='author'></input>
                    </div>
                    <div>
                        <label> Body: </label>
                        <input className='text' name='body' type='text' value={commentInEditMode.body} onChange={this.updateCommentState} placeholder='body'></input>
                    </div>
                    <div>
                        <button className='btn'> Add Comment </button>
                    </div>
                </div>
            )
        }
        return(
            <div className='flex-container'>
                <div className='details post'>
                    <h1>Post Detail View</h1>
                    <div>
                        <Link to={`/${category}/${post.id}/Edit`} className='edit-post'> Edit </Link>
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
                    <div>
                        <label>VoteScore:</label>
                        <span>{post.voteScore}</span>
                    </div>
                </div>
                <div className='details comments'>
                    <h1>Comments </h1>
                    { (this.props.comments && this.props.comments.length > 0)&&(
                        this.props.comments.map(comment=>(
                            <div key={comment.id}>
                                <label className='comment-author'>{comment.author}: </label>
                                <span className='comment-body'>{comment.body}</span>
                                <a href='#' className='comment-link' onClick={(event) => this.openCommentsModalInEditMode(event, comment)} >Edit</a>
                                <a href='#' className='comment-link' id={comment.id}  onClick={(event) => this.deleteComment(event, comment)} >Delete</a>
                            </div>
                        )))
                    }

                        <div>
                            <button className='btn' onClick={this.openCommentsModalInAddMode}>Add Comment</button>

                            <Modal
                                className='modal'
                                overlayClassName='overlay'
                                isOpen={this.state.commentsModalOpen}
                                onRequestClose={this.closeCommentsModal}
                                contentLabel='Modal'>
                                <form onSubmit={this.addComment}>
                                    <h3> Comments Form </h3>
                                    <div>
                                        <input type='hidden' name='parentId' value={post.id}/>
                                        <input type='hidden' name='timestamp' value={commentInEditMode.timeStamp} />
                                        <input type='hidden' name='id' value={commentInEditMode.id} />
                                    </div>
                                    {html}
                                </form>
                            </Modal>
                        </div>
                    </div>
                </div>

        )
    }
}


const mapStateToProps = ({appReducer}) => {
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
        },
        updatePostComment:(comment) => {
            dispatch(updateComment(comment))
        },
        addNewComment: (comment) => {
            dispatch(addComment(comment))
        },
        deleteCommentDetail:(id)=> {
            dispatch(deleteComment(id));
            window.location = '/'
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);