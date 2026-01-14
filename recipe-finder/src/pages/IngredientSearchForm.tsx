import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
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
import Navbar from '../components/shared/Navbar';
import SearchInput from '../components/shared/SearchInput';
import Pagination from '../components/shared/Pagination';
import Spinner from '../components/shared/Spinner';
import './IngredientSearchForm.css'



const IngredientSearchForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [ inputError, setInputError ] = useState<string>("")

    const ingredients = useAppSelector(selectPaginatedIngredients);
    const loading = useAppSelector(selectIngredientsLoading);
    const error = useAppSelector(selectIngredientsError);
    const searchTerm = useAppSelector(selectIngredientsSearchTerm);
    const currentPage = useAppSelector(selectIngredientsCurrentPage);
    const totalPages = useAppSelector(selectTotalPages);

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    const validation = (val: string) => {
        if(!val.trim())
            return "Please enter an ingredient.";
        return ""
    }

    const handleSearch = (value: string) => {
        dispatch(setSearchTerm(value))
        
        const error = validation(value)
        setInputError(error)
    }


    if (loading) {
        return (
        <>
        <Navbar />
        <Spinner />
        </>
        );  
    }

    if (error) {
        return (
            <div className='container'>
                <p>Error: {error}</p>
            </div>
        );
    }

    
    return (

        <>
            <Navbar/>
            <div className='main-container'>
                <h1 className='page-title'>
                    Ingredient Search
                </h1>
                <div className='search-box-container'>
                    <SearchInput
                       value={searchTerm}
                       
                       onChange={handleSearch}
                       placeholder='Enter ingredient name'
                    />
                    {inputError && <p>{inputError}</p>}
                </div>

                {ingredients.length === 0 ? (
                    <p>
                        No ingredients found
                    </p>
                  ) : (
                    <>
                        <div className='ingredients-grid'>
                            {ingredients.map(ingredient => (
                                <div 
                                  key={ingredient.idIngredient}
                                  className='ingredient-card'
                                  onClick={() => navigate(`/recipes/${ingredient.strIngredient}`)}
                                >
                                    {ingredient.strIngredient}
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
        </>
    );
};


export default IngredientSearchForm;