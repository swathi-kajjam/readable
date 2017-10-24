import React, {Component} from 'react';
import {connect} from 'react-redux';
import {orderBy} from 'lodash';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import serializeForm from 'form-serialize';
import VotingView from './VotingView';
import formValidator from '../utils/formValidator';
import {deletePost, addComment, updateComment, deleteComment} from '../actions';

/**
 * PostDetailView - Displays post detail view along with its comments
 */
class PostDetailView extends Component{
    constructor(props, context){
        super(props);

        this.state = {
            commentsModalOpen: false,
            isCommentEditMode: false,
            commentInAddEditMode: {
                author:'',
                body:'',
                parentId: this.props.match.params.post_id,
                id:Math.random().toString(36).substr(-8)
            }
        }
    }

    /**
     * @description - Opens the comments Model and sets the initial state of the comment
     */
    openCommentsModalInAddMode = () => {
        this.setState({
            commentsModalOpen: true,
            commentInAddEditMode: {
                author:'',
                body:'',
                id: Math.random().toString(36).substr(-8)
            }
        })
    }

    /**
     * @description - Closes the comments Model
     */
    closeCommentsModal = () => {
        this.setState({commentsModalOpen: false})
    }

    /**
     * @description - Set the default Comment State
     */
    setDefaultCommentState = () => {
        this.setState({isCommentEditMode:false,commentInAddEditMode:{
            author:'',
            body:'',
            id:Math.random().toString(36).substr(-8)}
        })
    }

    /**
     * @description - Allows to add / Update the comment details
     * @param e - click event
     */
    addComment = (e) => {
        e.preventDefault();
        if(formValidator.isValidForm()) {
            const values = serializeForm(e.target, {hash: true});
            if (this.state.isCommentEditMode) {
                values.timeStamp = new Date().getTime();
                this.props.updatePostComment(values)
            } else {
                this.props.addNewComment(values)
            }
            this.closeCommentsModal();
            //set the state back after adding/updating comment
            this.setDefaultCommentState()
        }
    }

    /**
     * @description - Allows to delete the post and all associated comments
     * @param event - click event
     * @param post - post to be deleted
     */
    deletePost = (event, post) => {
        this.props.deletePostDetail(post.id);
        post.comments.map(comment => {
            return this.deleteComment(null,comment.id)
        })
        event.preventDefault();
    }

    /**
     * @description - Allows to delete the comment
     * @param event - click event
     * @param id - id of the comment to be deleted
     */
    deleteComment = (event, id) => {
       //set the state back after deleting comment
       this.setDefaultCommentState()
       this.props.deleteCommentDetail(id);
       event.preventDefault();
    }

    /**
     * @description - Open Comment Modal in Edit Mode
     * @param event - click event
     * @param comment - comment to be edited
     */
    openCommentsModalInEditMode = (event, comment) => {
        this.setState({commentsModalOpen:true, isCommentEditMode:true, commentInAddEditMode: comment})
    }

    /**
     * @description - handle change in the comment field
     * @param event - change event
     */
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
            //If no post exists with the Id, redirect to Home Page
            if(!post){
                return window.location='/'
            }
            comments = post.comments &&  post.comments.filter(comment=> comment.deleted === false)
        }


        const {commentInAddEditMode, isCommentEditMode} = this.state;

        let commentHtml =  (
            <div>
            <div className="row">
                <div className="input-field col s12">
                    <input id="author" name='author' type="text" value={commentInAddEditMode.author} onChange={this.updateCommentState}  disabled={isCommentEditMode? true: false}/>
                    <label htmlFor='author'>Author: </label>
                    <div className="error" id="authorError" />
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input name='body' id="body" type="text" value={commentInAddEditMode.body} onChange={this.updateCommentState} />
                    <label htmlFor='body'>Body: </label>
                    <div className="error" id="bodyError" />
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <button className='btn'> {isCommentEditMode? 'Update': 'Add'} Comment </button>
                </div>
            </div>
            </div>
        )

        return(
            <div>
                <h5> Post Detail View </h5>
                {post && (
                    <div>
                        <div key={post.id} className="card light-blue darken-4">
                            <div className="card-content white">
                                <span className="card-title">   <span className='author'>{post.author} : </span> {post.title}<span className="comments-nbr">Comments:{comments && comments.length}</span></span>
                                <VotingView isPosts={true} voteScore={post.voteScore} id={post.id}/>
                            </div>
                            <div className="card-action">
                                <Link to={`/${post.category}/${post.id}/Edit`}>Edit</Link>
                                <Link to='#' onClick={(event) => this.deletePost(event, post)}> Delete </Link>
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
                                        <span className="card-title">   <span className='author'>{comment.author} : </span>{comment.body}</span>
                                        <VotingView isPosts={false} voteScore={comment.voteScore} id={comment.id}/>
                                    </div>
                                    <div className="card-action">
                                        <Link to='#' onClick={(event) => this.openCommentsModalInEditMode(event, comment)}>Edit</Link>
                                        <Link to="#"  onClick={(event) => this.deleteComment(event, comment.id)} >Delete</Link>
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