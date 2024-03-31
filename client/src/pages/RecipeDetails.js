import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/recipedetails.css';

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [user, setUser] = useState(null); // State to store user details

    // Log the id to check if it's being passed correctly
    console.log('Recipe ID:', id);

    // Log when the component renders
    console.log('RecipeDetails component rendered');

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/recipes/${id}`);
                if (response.ok) {
                    const recipeData = await response.json();
                    console.log('Fetched Recipe:', recipeData); // Log the fetched recipe data
                    setRecipe(recipeData);

                    // Fetch user data by username
                    const userResponse = await fetch(`http://localhost:5000/users/${recipeData.username}`);
                    if (userResponse.ok) {
                        const userData = await userResponse.json();
                        console.log('Fetched User:', userData); // Log the fetched user data
                        setUser(userData); // Assuming you have setUser function to set user data
                    } else {
                        throw new Error('Failed to fetch user data');
                    }
                } else {
                    throw new Error('Failed to fetch recipe details');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    console.log('Recipe:', recipe); // Log the recipe state

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/recipes/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Recipe deleted successfully');
                window.location.href = '/';
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Error deleting recipe:', error);
            // Handle error, e.g., display error message to user
        }
    };


    return (
        <div>
            {recipe && (
                <div className="recipe-container">
                    <img src={recipe.recipeImage} alt={recipe.recipeName} className="recipe-image" />
                    <p style={{ textAlign: 'right' }}>Nomilicious Contribution By: {user && user.username}</p>
                    <h2 className="recipe-title">{recipe.recipeName}</h2>
                    <div className="recipe-details">
                        <span className="recipe-category">Categories:</span>
                        <span className="recipe-info">{Array.isArray(recipe.categories) ? recipe.categories.join(', ') : recipe.categories}</span>
                        <span className="recipe-info"> | Inspiration: {recipe.inspiration}</span>
                        <span className="recipe-info"> | Serves: {recipe.serves} people</span>
                    </div>
                    <h3>Ingredients:</h3>
                    <ul className="ingredients-list">
                        {Array.isArray(recipe.ingredients) && recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="ingredient-item">
                                {ingredient.quantity} {ingredient.unit} {ingredient.name}
                            </li>
                        ))}
                    </ul>
                    <h3>Instructions:</h3>
                    <div className="recipe-instructions">
                        <p>{recipe.instructions}</p>
                    </div>
                    <h3>Preparation Time:</h3>
                    <div className="recipe-instructions">
                        Prep Time: {recipe.prepTime.hours} hrs {recipe.prepTime.minutes} min
                    </div>
                    <h3>Cook Time:</h3>
                    <div className="recipe-instructions">
                        Cook Time: {recipe.cookTime.hours} hrs {recipe.cookTime.minutes} min
                    </div>
                    <h3>Total Time:</h3>
                    <div className="recipe-instructions">
                        Total Time: {recipe.totalTime.hours} hrs {recipe.totalTime.minutes} min
                    </div>
                    <div className="recipe-actions">
                        <button onClick={handleDelete}>Delete Recipe</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RecipeDetails;
