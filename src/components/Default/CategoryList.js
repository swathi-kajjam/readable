import React from 'react';

function CategoryList(props){
    return (
        <div className=''>
            <ul className='categories-list'>
                {props.categories.map(catg => (
                    <li className='categories-list-item' key={catg.name}> {catg.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default CategoryList;