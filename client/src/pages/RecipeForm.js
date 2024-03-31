import React, { useState } from 'react';
import '../styles/recipeform.css'; // Import the CSS file

function RecipeForm({ username }) { // Accept username as a prop
    const [formData, setFormData] = useState({
        username: '', // Assuming username is passed as a prop
        recipeName: '',
        inspiration: '',
        specialtyDiets: '',
        categories: '',
        serves: 0,
        recipeImage: '',
        prepHours: '',
        prepMinutes: '',
        cookHours: '',
        cookMinutes: '',
        totalHours: '',
        totalMinutes: '',
        ingredients: [{ quantity: '', unit: '', name: '' }],
        instructions: ''
    });

    // Add a new function for handling ingredient changes
    const handleIngredientChange = (event, index, field) => {
        const { value } = event.target;
        const updatedIngredients = [...formData.ingredients];
        updatedIngredients[index][field] = value;
        setFormData(prevState => ({
            ...prevState,
            ingredients: updatedIngredients
        }));
    };

    // Function to add a new ingredient
    const handleAddIngredient = () => {
        setFormData(prevState => ({
            ...prevState,
            ingredients: [...prevState.ingredients, { quantity: '', unit: '', name: '' }]
        }));
    };



    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name.includes('ingredient-quantity') || name.includes('ingredient-name')) {
            const [fieldName, index] = name.split('[').map(item => item.replace(']', ''));
            const updatedIngredients = [...formData.ingredients];
            updatedIngredients[index][fieldName] = value;
            setFormData(prevState => ({
                ...prevState,
                ingredients: updatedIngredients
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Form Data:', formData);
            const { prepHours, prepMinutes, cookHours, cookMinutes, totalHours, totalMinutes, ...rest } = formData;

            // Construct the data object to be sent to the server
            const data = {
                ...rest, // Spread the remaining fields
                prepTime: { hours: prepHours, minutes: prepMinutes }, // Construct prep time object
                cookTime: { hours: cookHours, minutes: cookMinutes }, // Construct cook time object
                totalTime: { hours: totalHours, minutes: totalMinutes } // Construct total time object
            };
            const response = await fetch('http://localhost:5000/recipes/submit_recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert('Recipe added successfully');
                window.location.href = '/';
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Error occurred while sending request:', error);
            alert('Failed to add recipe: ' + error.message);
        }
    };

    return (
        <div className="recipe-form-container"> {/* Changed class name */}
            <h2>Add New Recipe</h2>
            {/* Content */}
            <div className="add-recipe-form">
                {/* Add recipe form goes here */}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={formData.username}  onChange={handleChange}  required /><br /><br /> {/* Use readOnly to prevent user input */}

                    <label htmlFor="recipeName">Recipe Name:</label>
                    <input type="text" id="recipeName" name="recipeName" value={formData.recipeName} onChange={handleChange} required /><br /><br />

                    <label htmlFor="inspiration">Inspiration:</label>
                    <input type="text" id="inspiration" name="inspiration" value={formData.inspiration} onChange={handleChange} /><br /><br />

                    <label htmlFor="specialtyDiets" >Specialty Diets:</label>
                    <select id="specialtyDiets" name="specialtyDiets" value={formData.specialtyDiets} onChange={handleChange}>
                        <option value="" disabled>Select Specialty Diet</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Gluten-Free">Gluten-Free</option>
                        <option value="Dairy-Free">Dairy-Free</option>
                        <option value="Grain-Free">Grain-Free</option>
                        <option value="Egg-Free">Egg-Free</option>
                    </select><br /><br />

                    <label htmlFor="categories">Categories:</label>
                    <select id="categories" name="categories" value={formData.categories} onChange={handleChange}>
                        <optgroup label="Meal Times">
                            <option value="" disabled>Select Category</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Brunch">Brunch</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinter">Dinter</option>
                        </optgroup>
                        <optgroup label="Side Dishes">
                            <option value="Salads">Salads</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Grain">Grain</option>
                            <option value="Other">Other</option>
                        </optgroup>
                        <optgroup label="Desserts">
                            <option value="Cookies">Cookies</option>
                            <option value="Cakes/Frosting">Cakes</option>
                            <option value="Pies">Pies</option>
                        </optgroup>
                        <optgroup label="Beverages">
                            <option value="For Minors 🧃">Minor Friendly 🧃</option>
                            <option value="For Miners 🍹⛏️">Miner Friendly 🍹⛏️</option>
                        </optgroup>
                    </select><br /><br />

                    <label htmlFor="serves">Serves:</label>
                    <input type="number" id="serves" name="serves" min="1" value={formData.serves} onChange={handleChange} required /> people<br /><br />

                    {/* Recipe Image */}
                    <label htmlFor="recipeImage">Recipe Image (URL):</label>
                    <input type="text" id="recipeImage" name="recipeImage" value={formData.recipeImage} onChange={handleChange} placeholder="Enter image URL" /><br /><br />

                    {/* Prep Time */}
                    <label htmlFor="prepHours">Prep Time:</label>
                    <input type="number" id="prepHours" name="prepHours" min="0" value={formData.prepHours} onChange={handleChange} placeholder="hrs" style={{ width: '70px' }} />
                    <input type="number" id="prepMinutes" name="prepMinutes" min="0" max="59" value={formData.prepMinutes} onChange={handleChange} placeholder="min" style={{ width: '70px' }} /><br /><br />

                    {/* Cook Time */}
                    <label htmlFor="cookHours">Cook Time:</label>
                    <input type="number" id="cookHours" name="cookHours" min="0" value={formData.cookHours} onChange={handleChange} placeholder="hrs" style={{ width: '70px' }} />
                    <input type="number" id="cookMinutes" name="cookMinutes" min="0" max="59" value={formData.cookMinutes} onChange={handleChange} placeholder="min" style={{ width: '70px' }} /><br /><br />

                    {/* Total Time */}
                    <label htmlFor="totalHours">Total Time:</label>
                    <input type="number" id="totalHours" name="totalHours" min="0" value={formData.totalHours} onChange={handleChange} placeholder="hrs" style={{ width: '70px' }} />
                    <input type="number" id="totalMinutes" name="totalMinutes" min="0" max="59" value={formData.totalMinutes} onChange={handleChange} placeholder="min" style={{ width: '70px' }} /><br /><br />
                    {/* Ingredients */}
                    <label>Ingredients:</label><br />
                    <div id="ingredients">
                        {formData.ingredients.map((ingredient, index) => (
                            <div className="ingredient-row" key={index}>
                                <input type="number" className="ingredient-quantity" name={`ingredient-quantity[${index}]`} value={ingredient.quantity} onChange={(event) => handleIngredientChange(event, index, 'quantity')}
                                    placeholder="Quantity" />
                                <select className="ingredient-unit" name={`ingredient-unit[${index}]`} value={ingredient.unit} onChange={(event) => handleIngredientChange(event, index, 'unit')}>
                                    <option value="g">g</option>
                                    <option value="kg">kg</option>
                                    <option value="oz">oz</option>
                                    <option value="lb">lb</option>
                                    <option value="ml">ml</option>
                                    <option value="cl">cl</option>
                                    <option value="dl">dl</option>
                                    <option value="l">l</option>
                                    <option value="tsp">tsp</option>
                                    <option value="tbsp">tbsp</option>
                                    <option value="fl oz">fl oz</option>
                                    <option value="cup">cup</option>
                                    <option value="pint">pint</option>
                                    <option value="quart">quart</option>
                                    <option value="gallon">gallon</option>
                                    <option value="pinch">pinch</option>
                                    <option value="piece">piece</option>
                                </select>
                                <input type="text" className="ingredient-name" name={`ingredient-name[${index}]`} placeholder="Ingredient" value={ingredient.name} onChange={(event) => handleIngredientChange(event, index, 'name')} />
                                <button type="button" className="btn-add-ingredient" onClick={handleAddIngredient}>+</button>
                            </div>
                        ))}
                    </div><br /><br />

                    <label htmlFor="instructions">Instructions:</label><br />
                    <textarea id="instructions" name="instructions" rows="8" cols="50" value={formData.instructions} onChange={handleChange} required></textarea><br /><br />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default RecipeForm;