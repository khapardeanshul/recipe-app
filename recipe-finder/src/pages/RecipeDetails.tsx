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
import './RecipeDetails.css'
import { extractIngredients } from '../utils/recipeUtils';


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
        return (
          <>
            <Spinner />;
          </>
        )
    };

    if (error) {
        return (
           <>
            <div className='main-container'>
              <Button variant='secondary' onClick={() => navigate(-1)}>
                  Back to Recipes
              </Button>
              <p>
                Error: {error}
              </p>

            </div>
           </>
          
        );
    };

    if (!recipe) {
        return(
          <>
            <div className='main-container'>
              <Button variant='secondary' onClick={() => navigate(-1)}>
                  Back to Recipes
              </Button>
                <p>
                    Recipe not found
                </p>
            </div>
          </>  
          
        );
    };


    const ingredients = extractIngredients(recipe);
  
     return (
      <>
        <div className='main-container'>
            <Button variant='primary' onClick={() => navigate(-1)}>
                    Back to Recipes
            </Button>

            <div className='recipe-detail-container'>
              <div className='recipe-detail-header'>
                  <div className='recipe-detail-img-container'>
                      <img src={recipe.strMealThumb} alt={recipe.strMeal} className='recipe-detail-image' />
                  </div>

                  <div className='recipe-detail-info'>
                      <h1 className='recipe-detail-title'>{recipe.strMeal}</h1>

                      <div className='recipe-meta'>
                        <div className='recipe-meta-item'>
                            <span className='meta-label'>Category:</span>
                            <span className='meta-value'>{recipe.strCategory}</span>
                        </div>
                        <div className='recipe-meta-item'>
                            <span className='meta-label'>Area:</span>
                            <span className='meta-value'>{recipe.strArea}</span>
                        </div>
                      </div>

                      {recipe.strYoutube && (
                        <a href={recipe.strYoutube} 
                           target='_blank'
                           rel="noopener noreferrer"
                           className="youtube-button">Watch Recipe on YouTube</a>
                      )}
                  </div>
              </div>

              <div className="recipe-section">
                <h2 className="section-title">Cooking Instructions</h2>
                <div className="instructions-box">
                  <p className="instructions-text">{recipe.strInstructions}</p>
                </div>
              </div>    

              <div className="recipe-section">
            <h2 className="section-title">Ingredients Required</h2>
            <div className="ingredients-table-container">
              <table className="ingredients-table">
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


            </div>
        </div>
      </>

  );

};


export default RecipeDetails;