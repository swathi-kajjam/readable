import React, {Component} from 'react';
import { connect } from 'react-redux';
import PostsList from './Common/PostsList';

/**
 * DefaultView - Displays all posts related to all categories
 */
class DefaultView extends Component{
    constructor(props, context){
        super(props)
    }

    render(){
        return(
            <div >
                <PostsList posts={this.props.posts}/>
            </div>
        )
    }
}

const mapStateToProps = ({appReducer}) => {
    return {
        posts: appReducer.posts
    }
}

const mapDisPatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDisPatchToProps)(DefaultView);