import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    fetchRecipesByIngredient,
    selectFilteredRecipes,
    selectRecipesLoading,
    selectRecipesError,
    setSearchTerm,
    clearRecipes,
} from '../store/recipesSlice';
import SearchInput from '../components/shared/SearchInput';
import Spinner from '../components/shared/Spinner';
import Button from '../components/shared/Button';

const RecipeList = () => {

    const { ingredient } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    

    const recipes = useAppSelector(selectFilteredRecipes);
    const loading = useAppSelector(selectRecipesLoading);
    const error = useAppSelector(selectRecipesError);


    useEffect(() => {
        if (ingredient) {
        dispatch(fetchRecipesByIngredient(ingredient));
        }
    }, [ingredient, dispatch])

    const handleSearch = (value: string) => {  
    setSearch(value);
    dispatch(setSearchTerm(value));
  };

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <div>
                <p>
                    Error: {error}
                </p>
            </div>
        );
    }

     return (
        <div className='container'>
            <Button variant='primary' onClick={() => navigate(-1)}>
                Back
            </Button>

            <h1>Recipes with {ingredient}</h1>

            <SearchInput 
                value={search}
                onChange={handleSearch}
                placeholder='Search Recipes...'
            />  

            <div className='recipe-grid'>
                {recipes.map(recipe => (
                    <div className='recipe-card'
                // /recipe/${recipe.idMeal}
                        key={recipe.idMeal}
                        onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                
                >
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                    <h3>{recipe.strMeal}</h3>
                </div>
                ))}
              
            </div>


        </div>
     );
};

export default RecipeList;
