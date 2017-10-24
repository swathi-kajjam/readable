import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

/**
 * CategoryList - Lists all the categories
 */
class CategoryList extends Component{
    constructor(props, context){
        super(props, context);
        console.log(this.props)
        this.state = {
            activeLink : "all"
        }
    }

    /**
     * @description - sets the active catgory
     * @param event - click event
     * @param post - post to be deleted
     */
    handleClick=(event)=>{
       const catg = event.currentTarget.getAttribute('catg-name');
       this.setState({activeLink:catg})
    }

    render(){
        const {activeLink} = this.state;

        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <ul>
                            <li key='all' catg-name='all' onClick={this.handleClick} className={activeLink==='all'?'active':''}><Link to='/'> All </Link> </li>
                            {this.props.categories.map(catg => (
                                <li key={catg.name} catg-name={catg.name} onClick={this.handleClick} className={activeLink=== catg.name?'active':''}>
                                    <Link to={`/${catg.name}`}> {catg.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = ({appReducer}) => {
    return {
        categories: appReducer.categories
    }
}

export default connect(mapStateToProps, null)(CategoryList);