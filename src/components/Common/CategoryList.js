import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {setActiveCategory} from "../../actions/index";

/**
 * CategoryList - Lists all the categories
 */
class CategoryList extends Component{
    /**
     * @description - sets the active catgory
     * @param event - click event
     * @param post - post to be deleted
     */
    handleClick=(event)=>{
       const catg = event.currentTarget.getAttribute('catg-name');
       this.props.changeCategory(catg);
    }

    render(){
        const activeCategory = this.props.activeCategory;

        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <ul>
                            <li key='all' catg-name='all' onClick={this.handleClick} className={activeCategory==='all'?'active':''}><Link to='/'> All </Link> </li>
                            {this.props.categories.map(catg => (
                                <li key={catg.name} catg-name={catg.name} onClick={this.handleClick} className={activeCategory=== catg.name?'active':''}>
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
        activeCategory: appReducer.activeCategory,
        categories: appReducer.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeCategory: (category) => {
            dispatch(setActiveCategory(category))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);