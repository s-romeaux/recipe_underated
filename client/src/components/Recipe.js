// Recipe.js

import React from 'react';

function Recipe({ title, ingredients, instructions }) {
    return (
        <div>
            <h2>{title}</h2>
            <h3>Ingredients</h3>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Instructions</h3>
            <p>{instructions}</p>
        </div>
    );
}

export default Recipe;
