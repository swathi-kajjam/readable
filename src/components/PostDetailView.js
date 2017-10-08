import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getComments} from '../actions';
import {orderBy} from 'lodash';

class PostDetailView extends Component{
    constructor(props, context){
        super(props);
    }

    componentDidMount(){
        this.props.getAllComments(this.props.match.params.id)
    }

    render(){
        const post = this.props.posts.find(post => post.id === this.props.match.params.id);
        console.log('<---------Render Posts ---------->')
        console.log(post)
        return(
            <div className='flex-container'>
                <div className='flex-item details'>
                    <h1>Post Detail View</h1>
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
                <div className='flex-item details'>
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

const assignCommentsToPosts = (posts, comments) => {
    if(comments.length >0){
        const parentId = comments[0].parentId;
        posts.map(post=>{
            if(post.id === parentId){
                post.comments = comments
            }
        })
    }
    return posts;
}

const mapStateToProps = ({appReducer, commentsReducer}) => {
    return {
        posts:appReducer.posts,
        comments:orderBy(commentsReducer.comments, 'voteScore', ['desc'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllComments: (id) => {
            dispatch(getComments(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);