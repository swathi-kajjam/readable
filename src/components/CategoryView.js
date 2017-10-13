import React, {Component} from 'react';
import { connect } from 'react-redux';
import PostsList from "./Common/PostsList";

class CategoryView extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            category: this.props.match.params.category
        }
    }

    filterPostsByCategory=(posts, category) => {
        return posts.filter(post => post.category === category)
    }

    render(){
        const {category} = this.state;
        const posts = this.filterPostsByCategory(this.props.posts, category)
        return(
            <div>
                Category View
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

const mapDispatchToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView)