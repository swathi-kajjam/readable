import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

class CategoryList extends Component{
    render(){
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <ul>
                            <li><Link to='/'> All </Link> </li>
                            {this.props.categories.map(catg => (
                                <li key={catg.name}>
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