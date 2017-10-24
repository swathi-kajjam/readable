import React, {Component} from 'react';
import { connect } from 'react-redux';
import PostsList from "./Common/PostsList";

/**
 * CategoryView - Display posts based on the selected category
 */
class CategoryView extends Component {

    render(){
        const category = this.props.match.params.category;
        const posts = this.props.posts.filter(post => post.category === category)
        return(
            <div>
                <PostsList posts={posts} category={category}/>
            </div>
        )
    }
}

const mapStateToProps = ({appReducer}) => {
   return {
        posts: appReducer.posts
   }
}

export default connect(mapStateToProps, null)(CategoryView)