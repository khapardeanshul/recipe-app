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
import Navbar from '../components/shared/Navbar';
import SearchInput from '../components/shared/SearchInput';
import Spinner from '../components/shared/Spinner';
import Button from '../components/shared/Button';
import './RecipeList.css'

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
        return (
            <>
            <Navbar/>
            <Spinner />
            </>
        );
    }

    if (error) {
        return (
            <>
            <Navbar/>
            <div className='main-container'>
                <button onClick={() => navigate('/')}>
                    Back to Ingredients
                </button>
                
                <p>
                    Error: {error}
                </p>
            
            </div>
            </>
        );
    }

     return (
        <>
        <Navbar/>
        <div className='main-container'>
            <div className='recipe-list-header'>
                <Button variant='primary' onClick={() => navigate(-1)}>
                    Back to Ingredients
                </Button>

                <h1 className='page-title'>Recipes with {ingredient}</h1>
            </div>
            <div className='search-box-container'>
                <SearchInput
                value={search}
                onChange={handleSearch}
                placeholder='Search Recipes...'
            /> 
            </div>

            {recipes.length === 0 ? (
                <p>
                    No recipes found
                </p>
            ) : (
                <div className='recipe-grid'>
                    {recipes.map(recipe => (
                        <div 
                            key={recipe.idMeal}
                            className='recipe-card'
                            onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                        >
                            <div className='recipe-image-container'>
                                <img src={recipe.strMealThumb} alt={recipe.strMeal} 
                                  className='recipe-image'
                                />
                            </div>
                            <div className='recipe-name'>
                                {recipe.strMeal}
                            </div>
                        </div>
                    ))}
                </div>

            )}
            

           


        </div>

       </> 
     );
};

export default RecipeList;


//  <div className='recipe-grid'>
//                 {recipes.map(recipe => (
//                     <div 
//                         key={recipe.idMeal}
//                         className='recipe-card'
//                         onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                
//                 >
//                     <img src={recipe.strMealThumb} alt={recipe.strMeal} />
//                     <h3>{recipe.strMeal}</h3>
//                 </div>
//                 ))}
              
//             </div>