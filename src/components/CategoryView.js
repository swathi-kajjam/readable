import React, {Component} from 'react';
import { connect } from 'react-redux';

class CategoryView extends Component {
    componentDidMount(){

    }
    render(){
        return(
            <div>
                Category View
            </div>
        )
    }

}

const mapStateToProps = (state) => {
   return {

   }
}

const mapDispatchToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView)