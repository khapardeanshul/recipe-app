import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    fetchCategories,
    selectCategories,
    selectCategoriesLoading,
    selectCategoriesError,
} from '../store/categoriesSlice';
import Navbar from '../components/shared/Navbar';
import Spinner from '../components/shared/Spinner';
import './Categories.css';


const Categories = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const categories = useAppSelector(selectCategories);
    const loading = useAppSelector(selectCategoriesLoading);
    const error = useAppSelector(selectCategoriesError);

    useEffect (() => {
        dispatch(fetchCategories());
    }, [dispatch]);


    if (loading) {
        return (
            <>
                <Navbar />;
                <Spinner />;
            </>
        );
    }

    if (error) {
        return (
            <>
            <Navbar />
            <div className='main-container'>
                <p>
                    Error: {error}
                </p>
            </div>
            </>
        );
    }


    return (
        <>
            <Navbar />
            <div className='main-container'>
                <h1 className='page-title'>
                    Categories
                </h1>

                <div className='categories-grid'>
                    {categories.map(category => (
                        <div 
                            key={category.idCategory}
                            className='category-card'
                            // onClick={() => navigate(`/category/${category.strCategory}`)}
                        >
                            <div className='category-image-container'>
                                <img 
                                src={category.strCategoryThumb} 
                                alt={category.strCategory}
                                className='category-image' />

                                {/* <div className='category-overlay'>
                                    <span className='view-category'>View Recipes</span>
                                </div> */}
                            </div>

                            <div className='category-info'>
                                <h3 className='category-name'>
                                    {category.strCategory}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};


export default Categories;