import React, {useEffect} from 'react';
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


    // const grouped: Record<string, Ingredient[]> = {}
    // ingredients.forEach(ingredient => {
    //     const letter = ingredient.strIngredient[0].toUpperCase();
    //     if (!grouped[letter]) {
    //         grouped[letter] =[];
    //     }
    //     grouped[letter].push(ingredient);
    // });
    
    // const letters = Object.keys(grouped).sort();
    
    return (
        // <div className='container'>
        //     <h1>Recipe Search</h1>

        //     <SearchInput
        //         value = {searchTerm}
        //         onChange={(value) => dispatch(setSearchTerm(value))}
        //         placeholder='Search Ingredients...'
        //     />

        
        //     {ingredients.length === 0 ? (
        //         <p>No ingrerdients found</p>
        //     ) : (
        //         <>
        //             <div className='ingredients-list'>
        //                 {letters.map(letter => (
        //                     <div key={letter}>
        //                         <h3>{letter}</h3>
        //                         {grouped[letter].map(ingredient => (
        //                             <div className='ingredient-item'
        //                             key={ingredient.idIngredient}
        //                             onClick={() => navigate(`/recipes/${ingredient.strIngredient}`)}
        //                             >
        //                                 {ingredient.strIngredient}
        //                             </div>
        //                         ))}
        //                     </div>
        //                 ))}
        //             </div>

        //             <Pagination
        //                 currentPage={currentPage}
        //                 totalPages={totalPages}
        //                 onPageChange={(page) => dispatch(setCurrentPage(page))}
        //             />
        //         </>
        //     )}

            
        // </div>

        <>
            <Navbar/>
            <div className='main-container'>
                <h1 className='page-title'>
                    Ingredient Search
                </h1>
                <div className='search-box-container'>
                    <SearchInput
                       value={searchTerm}
                       onChange={(value) => dispatch(setSearchTerm(value))}
                       placeholder='Enter ingredient name'
                    />
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