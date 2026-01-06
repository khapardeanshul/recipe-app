import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import {
    fetchRecipeDetail,
    selectRecipeDetail,
    selectRecipeDetailLoading,
    selectRecipeDetailError,

} from '../store/recipeDetailSlice';
import Button from '../components/shared/Button';
import Spinner from '../components/shared/Spinner';


const RecipeDetails = () => {

    const {id} = useParams<{id:string}>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const recipe = useAppSelector(selectRecipeDetail);
    const loading = useAppSelector(selectRecipeDetailLoading);
    const error = useAppSelector(selectRecipeDetailError);

    useEffect (() => {
        if (!id) return;
        dispatch(fetchRecipeDetail(id));
    }, [id, dispatch]);

    if (loading) {
        return <Spinner />;
    };

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
            </div>
            // maybe a back button
        );
    };

    if (!recipe) {
        return(
            <div className='container'>
                <p>
                    Recipe not found
                </p>
            </div>
            // maybe a back button 
        );
    };


    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push({ ingredient, measure });
        }
    }
  
     return (
   <div className="container">
      <Button variant="primary" onClick={() => navigate(-1)}>Back to Recipes</Button>

     <div className="recipe-header">
       <img src={recipe.strMealThumb} alt={recipe.strMeal} />
       <div className="recipe-info">
         <h1>{recipe.strMeal}</h1>
         <p>Category: {recipe.strCategory}</p>
         <p>Area: {recipe.strArea}</p>
         {recipe.strYoutube && (
           <a href={recipe.strYoutube} target="\_blank" rel="noopener noreferrer">
            Watch on YouTube
           </a>
         )}
       </div>
    </div>

     <div className="recipe-section">
       <h2>Cooking Instructions</h2>
       <p>{recipe.strInstructions}</p>
     </div>

     <div className="recipe-section">
      <h2>Ingredients Required</h2>
       <table>
         <thead>
           <tr>
             <th>Measure</th>
             <th>Ingredient</th>
           </tr>
         </thead>
         <tbody>
           {ingredients.map((item, index) => (
             <tr key={index}>
               <td>{item.measure}</td>
               <td>{item.ingredient}</td>
             </tr>
           ))}
         </tbody>
       </table>
    </div>
   </div>

  );

};


export default RecipeDetails;