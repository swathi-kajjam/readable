import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updatePostVoting, updateCommentVoting} from "../actions";

/**
 * Voting - Allows users to upvote or downvote a post / comment
 */
class Voting extends Component{

    /**
     * @description - update voting for post / comment
     * @param event - click event
     */
    updateVoting = (event) => {
        event.preventDefault();
        if(this.props.isPosts){
            this.props.updatePostVoting(this.props.id, {option:event.target.getAttribute('votetype')})
        }
        else{
            this.props.updateCommentVoting(this.props.id, {option:event.target.getAttribute('votetype')})
        }
    }

    render(){
        return(
            <div>
                <button votetype='downVote' onClick={this.updateVoting}>-</button>
                <span className='voteScore'> {this.props.voteScore}</span>
                <button votetype='upVote' onClick={this.updateVoting}>+</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePostVoting: (id, option) => {
            dispatch(updatePostVoting(id, option));
        },
        updateCommentVoting:(id, option) => {
            dispatch(updateCommentVoting(id, option));
        }
    }
}

export default connect(null, mapDispatchToProps)(Voting)

