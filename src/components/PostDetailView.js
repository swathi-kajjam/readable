import React, {Component} from 'react';
import {connect} from 'react-redux';

class PostDetailView extends Component{
    constructor(props, context){
        super(props);
    }

    render(){
        const post = this.props.posts.find(post => post.id === this.props.match.params.id);
        console.log(post)
        return(
            <div className='flex-container'>
                <div className='flex-item post-details'>
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
                <div className='flex-item'>
                    Comments
                </div>
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView);