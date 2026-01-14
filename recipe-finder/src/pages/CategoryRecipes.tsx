import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    fetchRecipesByCategory,
    selectFilteredRecipes,
    selectRecipesLoading,
    selectRecipesError,
    setSearchTerm,
    clearRecipes,
} from '../store/recipesSlice';
import Button from '../components/shared/Button';
import Spinner from '../components/shared/Spinner';
import Navbar from '../components/shared/Navbar';
import SearchInput from '../components/shared/SearchInput';
import './RecipeList.css';

const CategoryRecipes = () => {

    const { category } = useParams<{category: string}>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [ search, setSearch ] = useState('')
    const [inputError, setInputError] = useState('')

    const recipes = useAppSelector(selectFilteredRecipes);
    const loading = useAppSelector(selectRecipesLoading);
    const error = useAppSelector(selectRecipesError);


    useEffect(() => {
        if (category) {
            dispatch(fetchRecipesByCategory(category));
        }

    }, [category, dispatch]);

    const validation = (val: string) => {
        if(!val.trim())
            return "Please add recipe name"

        return ""
    }


    const handleSearch = (value: string) => {
        setSearch(value);
        dispatch(setSearchTerm(value));

        const error = validation(value)
        setInputError(error)
    };

    if (loading) {
        return (
            <>
                <Navbar />;
                <Spinner />;
            </>
        )
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className='main-container'>
                    <div className='content-wrapper'>
                        <Button 
                            variant='primary'
                            onClick={() => navigate('/categories')}
                        >Back</Button>
                        <div className='error-box'>
                            <p>
                                Error: {error}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className='main-container'>
                    <Button 
                    variant='primary'
                    onClick={() => navigate('/categories')}
                    >
                    Back
                    </Button>

                    <div className='recipe-list-header'>
                        <h1 className='page-title'>
                            {category} Recipes
                        </h1>
                    </div>

                    <div className='search-box-container'>
                        <SearchInput
                            value={search}
                            onChange={handleSearch}
                            placeholder='Search recipes...'
                        />
                        {inputError && <p>{inputError}</p>}
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
    )
};

export default CategoryRecipes;