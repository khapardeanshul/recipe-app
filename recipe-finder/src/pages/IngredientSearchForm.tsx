import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Ingredient } from '../types/meal.types';
import {
    fetchIngredients,
    setSearchTerm,
    setCurrentPage,
    selectPaginatedIngredients,
    selectIngredientsLoading,
    selectIngredientsError,
    selectIngredientsSearchTerm,
    selectIngredientsCurrentPage,
    selectTotalPages,
} from '../store/ingredientsSlice';
import SearchInput from '../components/shared/SearchInput';
import Pagination from '../components/shared/Pagination';
import Spinner from '../components/shared/Spinner';

const IngredientSearchForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const ingredients = useAppSelector(selectPaginatedIngredients);
    const loading = useAppSelector(selectIngredientsLoading);
    const error = useAppSelector(selectIngredientsError);
    const searchTerm = useAppSelector(selectIngredientsSearchTerm);
    const currentPage = useAppSelector(selectIngredientsCurrentPage);
    const totalPages = useAppSelector(selectTotalPages);

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <div className='container'>
                <p>Error: {error}</p>
            </div>
        );
    }


    const grouped: Record<string, Ingredient[]> = {}
    ingredients.forEach(ingredient => {
        const letter = ingredient.strIngredient[0].toUpperCase();
        if (!grouped[letter]) {
            grouped[letter] =[];
        }
        grouped[letter].push(ingredient);
    });
    
    const letters = Object.keys(grouped).sort();
    
    return (
        <div className='container'>
            <h1>Recipe Search</h1>

            <SearchInput
                value = {searchTerm}
                onChange={(value) => dispatch(setSearchTerm(value))}
                placeholder='Search Ingredients...'
            />

        
            {ingredients.length === 0 ? (
                <p>No ingrerdients found</p>
            ) : (
                <>
                    <div className='ingredients-list'>
                        {letters.map(letter => (
                            <div key={letter}>
                                <h3>{letter}</h3>
                                {grouped[letter].map(ingredient => (
                                    <div className='ingredient-item'
                                    key={ingredient.idIngredient}
                                    onClick={() => navigate(`/recipes/${ingredient.strIngredient}`)}
                                    >
                                        {ingredient.strIngredient}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => dispatch(setCurrentPage(page))}
                    />
                </>
            )}

            
        </div>
    );
};


export default IngredientSearchForm;