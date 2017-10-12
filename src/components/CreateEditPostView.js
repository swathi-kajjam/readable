import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updatePost, addPost} from '../actions'

class CreateEditPostView extends Component {
    constructor(props, context){
        super(props);

        const postId = this.props.match.params.id;
        if(postId){
            const post = this.props.posts.find(post => post.id === this.props.match.params.id);
            this.state = {
                post,
                isEditMode: true
            }
        }
        else{
            this.state= {
                post: {
                    title:'',
                    body:'',
                    author:'',
                    timeStamp: new Date().getTime()
                },
                isEditMode: false
            }
        }
    }

    handleChange = (event) => {
        const post = this.state.post;
        post[event.target.name] = event.target.value;
        this.setState({post})
    }

    updatePost = (event) => {
        this.state.post.timeStamp = new Date().getTime();
        this.props.updatePostDetails(this.state.post);
        event.preventDefault()
    }

    render(){
        const {isEditMode} = this.state;
       return(
        <div className='flex-container'>
           <h1>Create / Edit Post</h1>
            <div className='details post'>
                <div>
                    <label>Title:</label>
                    <input className='text' name='title' type='text' value={this.state.post.title} onChange={this.handleChange}></input>
                </div>
                <div>
                    <label>Body:</label>
                    <input className='text' name='body' type='text' value={this.state.post.body} onChange={this.handleChange}></input>
                </div>
                <div>
                    <label>Author:</label>
                    <span>{this.state.post.author}</span>
                </div>
                <div>
                    <label>Timestamp:</label>
                    <span>{this.state.post.timestamp}</span>
                </div>
                <div>
                    <input type="button" className="btn" value={isEditMode? 'Update': 'Add'} onClick={this.updatePost}/>
                </div>

            </div>
       </div>)
    }
}

const mapStateToProps = ({appReducer}) => {
    return {
        posts: appReducer.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePostDetails: (post) => {
            dispatch(updatePost(post));
            window.location = `/`;
        },
        addPostDetails: (post) => {
            dispatch(addPost(post));
            window.location = `/`;
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateEditPostView);