import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updatePost, addPost} from '../actions';
import serializeForm from 'form-serialize';

class CreateEditPostView extends Component {
    constructor(props, context){
        super(props);
        const postId = this.props.match.params.post_id;
        if(postId){
            const post = this.props.posts.find(post => post.id === postId);
            this.state = {
                post,
                isEditMode: true,
            }
        }
        else{
            this.state= {
                post: {
                    title:'',
                    body:'',
                    author:'',
                    category: this.props.match.params.category,
                    id: Math.random().toString(36).substr(-8)
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

    addUpdatePost = (event) => {
        event.preventDefault()
        const values = serializeForm(event.target, {hash:true})
        values.timestamp = new Date().getTime();
        if(this.state.isEditMode){
            this.props.updatePostDetails(values);
        }
        else{
            values.id = Math.random().toString(36).substr(-8);
            this.props.addPostDetails(values);
        }


    }

    render(){
        const {isEditMode, post} = this.state;
       return(
        <div className='flex-container'>
           <h1>Create / Edit Post</h1>
            <form className='details post' onSubmit={this.addUpdatePost} >

                <div>
                    <label>Title:</label>
                    <input className='text' name='title' type='text' value={post.title} onChange={this.handleChange}></input>
                </div>
                <div>
                    <label>Body:</label>
                    <input className='text' name='body' type='text' value={post.body} onChange={this.handleChange}></input>
                </div>
                <div>
                    <label>Author:</label>
                    <input className='text' name='author' type='text' value={post.author} onChange={this.handleChange}
                    disabled={isEditMode === true}></input>
                </div>
                <div>
                    <input type='hidden' name='category' value={post.category}/>
                    <input type='hidden' name='id' value={post.id}/>
                </div>
                <div>
                    <button className="btn" > {isEditMode? 'Update': 'Add'} </button>
                </div>


            </form>
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