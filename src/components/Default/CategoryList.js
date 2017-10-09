import React from 'react';
import { Link } from 'react-router-dom';

function CategoryList(props){
    return (
        <div className='flex-item'>
            <h1> Categories </h1>
            <ul className='categories-list'>
                {props.categories.map(catg => (
                    <li className='categories-list-item' key={catg.name}>
                        <Link to={`/category/${catg.name}`}> {catg.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CategoryList;