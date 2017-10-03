import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getAllCategories, getAllPosts} from '../../actions';

class DefaultView extends Component{
    componentDidMount(){
        this.props.getCategories()
        this.props.getAllPosts()
    }
    render(){
        return(
            <div>
              Default View
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    console.log(state)
    return {
        categories: state.categories,
        posts: state.posts
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