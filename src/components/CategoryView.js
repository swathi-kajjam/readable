import React, {Component} from 'react';
import { connect } from 'react-redux';
import PostsList from "./Common/PostsList";

class CategoryView extends Component {
    componentDidMount(){

    }

    filterPostsByCategory=(posts) => {
        return posts.filter(post => post.category === this.props.match.params.category)
    }

    render(){
        const posts = this.filterPostsByCategory(this.props.posts)
        return(
            <div>
                Category View
                <PostsList posts={posts}/>
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