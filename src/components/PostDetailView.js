import React, {Component} from 'react';
import {connect} from 'react-redux';
import {orderBy} from 'lodash';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import serializeForm from 'form-serialize';
import VotingView from './VotingView';

import {deletePost, addComment, updateComment, deleteComment} from '../actions';

class PostDetailView extends Component{
    constructor(props, context){
        super(props);

        this.state = {
            commentsModalOpen: false,
            isCommentEditMode: false,
            commentInAddEditMode: {},
            category: this.props.match.params.category
        }
    }

    openCommentsModalInAddMode = () => {
        this.setState({
            commentsModalOpen: true,
            commentInAddEditMode: {
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
            console.log(values)
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
        this.setState({commentsModalOpen:true, isCommentEditMode:true, commentInAddEditMode: comment})
    }

    updateCommentState = (event) => {
        const field = event.target.name;
        const comment = this.state.commentInAddEditMode;
        comment[field] = event.target.value;
        this.setState({commentInAddEditMode: comment})
    }

    render(){
        let post = '',
            comments = [];

        if(this.props.posts.length > 0){
            post = this.props.posts.find(post => post.id === this.props.match.params.post_id);
            comments = post.comments &&  post.comments.filter(comment=> comment.deleted === false)
        }


        const {commentInAddEditMode, isCommentEditMode, category} = this.state;

        let commentHtml;

        if(isCommentEditMode === true){
            commentHtml =  (
                <div>
                    <div className="row">
                        <div className="input-field col s12">
                            <span className='comment-author'>{commentInAddEditMode.author}:</span>
                            <input className='text lrg' name='body' type='text' value={commentInAddEditMode.body} onChange={this.updateCommentState} placeholder='body'></input>
                            <button className='btn'> Update Comment </button>
                        </div>
                    </div>
                 </div>
            )
        }else{
            commentHtml =  (
                <div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="author" name='author' type="text" value={commentInAddEditMode.author} onChange={this.updateCommentState} />
                        <label htmlFor='author'>Author: </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input name='body' id="body" type="text" value={commentInAddEditMode.body} onChange={this.updateCommentState} />
                        <label htmlFor='body'>Body: </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <button className='btn'> Add Comment </button>
                    </div>
                </div>
                </div>
            )
        }

        return(
            <div>
                <h5> Post Detail View </h5>
                {post && (
                    <div>
                    <div key={post.id} className="card light-blue darken-4">
                        <div className="card-content white">

                            <span className="card-title">   <span className='author'>{post.author} : </span> {post.title}<span className="comments-nbr">Comments:{post.comments && post.comments.length}</span></span>
                            <VotingView isPosts={true} voteScore={post.voteScore} id={post.id}/>
                        </div>
                        <div className="card-action">
                            <Link to={`/${category}/${post.id}/Edit`}>Edit</Link>
                            <Link to='#' id={post.id} onClick={this.deletePost}> Delete </Link>
                        </div>
                    </div>
                    <div className="row">
                            <Modal
                                className='comment-modal'
                                overlayClassName='comment-overlay'
                                isOpen={this.state.commentsModalOpen}
                                onRequestClose={this.closeCommentsModal}
                                contentLabel='Modal'>
                                <div className="row">
                                    <form className="col s12" onSubmit={this.addComment}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type='hidden' name='parentId' value={post.id}/>
                                                <input type='hidden' name='timestamp' value={commentInAddEditMode.timeStamp} />
                                                <input type='hidden' name='id' value={commentInAddEditMode.id} />
                                            </div>
                                        </div>
                                        {commentHtml}
                                    </form>
                                </div>
                            </Modal>
                        </div>
                    </div>
                )}


                <div className="row">

                    {(comments && comments.length > 0)&&(
                        <div>
                        <div className=" card card-panel teal lighten-2"> Comments</div>
                            {comments.map(comment=>(
                                <div key={comment.id} className="card cyan darken-4">
                                    <div className="card-content white">
                                        <span className="card-title">   <span className='author'>{comment.author} : </span> {comment.body}</span>
                                        <VotingView isPosts={false} voteScore={comment.voteScore} id={comment.id}/>
                                    </div>
                                    <div className="card-action">
                                        <Link to='#' onClick={(event) => this.openCommentsModalInEditMode(event, comment)}>Edit</Link>
                                        <Link to="#" id={comment.id}  onClick={(event) => this.deleteComment(event, comment)} >Delete</Link>
                                    </div>
                                </div>
                            ))}

                        </div>
                    )}

                    <button className='btn' onClick={this.openCommentsModalInAddMode}>Add Comment</button>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);