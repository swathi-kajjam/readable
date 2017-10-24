import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updatePost, addPost} from '../actions';
import serializeForm from 'form-serialize';
import formValidator from '../utils/formValidator';

/**
 * CreateEditPostView - Allows users to add / update post
 */
class CreateEditPostView extends Component {
    constructor(props, context){
        super(props);
        const postId = this.props.match.params.post_id;

        if(postId){
            this.state = {
                isEditMode: true,
                isFormEditing: false
            }
        }
        else{
            this.state= {
                post: {
                    title:'',
                    body:'',
                    author:'',
                    category: this.props.match.params.category || '',
                    id: Math.random().toString(36).substr(-8)
                },
                isEditMode: false,
                isFormEditing: false

            }
        }

    }

    /**
     * @description - handle change in the input field value
     * @param event - text change event
     * @param post - current post
     */
    handleChange = (event, post) => {
        post[event.target.name] = event.target.value;
        this.setState({post, isFormEditing:true})
    }

    /**
     * @description - get the post associated with post id in Edit Mode
     * @returns post associated with post id in Edit Mode
     */
    filterPost(){
        if(this.state.isEditMode && ! this.state.isFormEditing && this.props.posts.length>0){
            return this.props.posts.find(post => post.id === this.props.match.params.post_id)
        }
        return this.state.post;
    }

    /**
     * @description - Allows to add / Update the post details
     * @param event - click event
     */
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
      let {isEditMode} = this.state;
      const post = this.filterPost()

       if(post) {
           return (
               <div className='row'>
                   <h1>Create / Edit Post</h1>
                   <form className='col s12 editform' onSubmit={this.addUpdatePost}>
                       <div className="row">
                           <select id='category' name='category' defaultValue={post.category}>
                               <option value = "">Select Category</option>
                               {this.props.categories.map(category => (
                                   <option key={category.name} value={category.name} >{category.name}</option>
                               ))}
                           </select>
                           <div className="error" id="categoryError"/>
                       </div>
                       <div className="row">
                           <div className="input-field col s12">
                               <label htmlFor='title'>Title:</label>
                               <input id='title' name='title' type='text' value={post.title}
                                      onChange={(event) => this.handleChange(event, post)}></input>
                               <div className="error" id="titleError"/>
                           </div>
                       </div>
                       <div className="row">
                           <div className="input-field col s12">
                               <label htmlFor='body'>Body:</label>
                               <input id='body' name='body' type='text' value={post.body}
                                      onChange={(event) => this.handleChange(event, post)}></input>
                               <div className="error" id="bodyError"/>
                           </div>
                       </div>
                       <div className="row">
                           <div className="input-field col s12">
                               <label htmlFor='author'>Author:</label>
                               <input id='author' name='author' type='text' value={post.author}
                                      onChange={(event) => this.handleChange(event, post)}
                                      disabled={isEditMode ? true : false}></input>
                               <div className="error" id="authorError"/>
                           </div>
                       </div>
                       <div className="row">
                           <div className="input-field col s12">
                               <input type='hidden' name='id' value={post.id}/>
                           </div>
                       </div>
                       <div className="row">
                           <div className="input-field col s12">
                               <button className="btn"> {isEditMode ? 'Update' : 'Add'} </button>
                           </div>
                       </div>
                   </form>
               </div>
           )
       }
       return(null)
    }
}

const mapStateToProps = ({appReducer}) => {
    return {
        posts: appReducer.posts,
        categories: appReducer.categories
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