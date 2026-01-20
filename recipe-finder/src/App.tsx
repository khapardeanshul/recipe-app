import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import  IngredientSearchForm  from './pages/IngredientSearchForm';
import RecipeList from './pages/RecipeList';
import RecipeDetails from './pages/RecipeDetails';
import Categories from './pages/Categories';
import CategoryRecipes from './pages/CategoryRecipes';
import './App.css';

function App() {
  return (
   <Router>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<IngredientSearchForm/>} />
        <Route path="/recipes/:ingredient" element={<RecipeList/>}/>
        <Route path="/recipe/:id" element={<RecipeDetails/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/category/:category" element={<CategoryRecipes/>}/>
      </Route>
    </Routes>
   </Router>
  );
}

export default App;
