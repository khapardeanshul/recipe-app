import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  IngredientSearchForm  from './pages/IngredientSearchForm';
import RecipeList from './pages/RecipeList';
import RecipeDetails from './pages/RecipeDetails';
import Categories from './pages/Categories';
import './App.css';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<IngredientSearchForm/>} />
      <Route path="/recipes/:ingredient" element={<RecipeList/>}/>
      <Route path="/recipe/:id" element={<RecipeDetails/>}/>
      <Route path="/categories" element={<Categories/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
