import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updatePost, addPost} from '../actions';
import serializeForm from 'form-serialize';
import formValidator from '../utils/formValidator';

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
        event.preventDefault();
        const values = serializeForm(event.target, {hash:true})
        if(formValidator.isValidForm()) {
            values.timestamp = new Date().getTime();
            if (this.state.isEditMode) {
                this.props.updatePostDetails(values);
            }
            else {
                values.id = Math.random().toString(36).substr(-8);
                this.props.addPostDetails(values);
            }
        }
    }

    render(){
       const {isEditMode, post} = this.state;
       return(
           <div className='row'>
               <h1>Create / Edit Post</h1>
               <form className='col s12 editform' onSubmit={this.addUpdatePost} >
                   <div className="row">
                       <div className="input-field col s12">
                           <label htmlFor='title'>Title:</label>
                           <input id='title' name='title' type='text' value={post.title} onChange={this.handleChange}></input>
                           <div className="error" id="titleError" />
                       </div>
                   </div>
                   <div className="row">
                       <div className="input-field col s12">
                           <label  htmlFor='body'>Body:</label>
                           <input id='body' name='body' type='text' value={post.body} onChange={this.handleChange} ></input>
                           <div className="error" id="bodyError" />
                       </div>
                   </div>
                   <div className="row">
                       <div className="input-field col s12">
                           <label htmlFor='author'>Author:</label>
                           <input id='author' name='author' type='text' value={post.author} onChange={this.handleChange}
                           disabled={isEditMode? true: false}></input>
                           <div className="error" id="authorError" />
                       </div>
                   </div>
                   <div className="row">
                       <div className="input-field col s12">
                           <input type='hidden' name='category' value={post.category}/>
                           <input type='hidden' name='id' value={post.id}/>
                       </div>
                   </div>
                   <div className="row">
                       <div className="input-field col s12">
                           <button className="btn" > {isEditMode? 'Update': 'Add'} </button>
                       </div>
                   </div>
               </form>
           </div>
       )
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
            window.location = `/${post.category}/${post.id}`;
        },
        addPostDetails: (post) => {
            dispatch(addPost(post));
            window.location = `/${post.category}/${post.id}`;
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateEditPostView);