import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getAllCategories, getAllPosts} from '../../actions';
import CategoryList from './CategoryList';
import PostsList from '../Common/PostsList';

class DefaultView extends Component{
    constructor(props, context){
        super(props)
    }
    componentDidMount(){
        this.props.getCategories()
        this.props.getAllPosts()
    }

    render(){

        return(
            <div className="flex-container">
                <CategoryList categories={this.props.categories} />
                <PostsList posts={this.props.posts}/>
            </div>
        )
    }
}

const mapStateToProps = ({appReducer}) => {
    return {
        categories: appReducer.categories,
        posts: appReducer.posts
    }
}

const mapDisPatchToProps = (dispatch) => {
    return {
        getCategories: () => {
            dispatch(getAllCategories())
        },
        getAllPosts: () => {
            dispatch(getAllPosts())
        }
    }
}
export default connect(mapStateToProps, mapDisPatchToProps)(DefaultView);