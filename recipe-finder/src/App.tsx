import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  IngredientSearchForm  from './pages/IngredientSearchForm';
import RecipeList from './pages/RecipeList';
import RecipeDetails from './pages/RecipeDetails';
import './App.css';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<IngredientSearchForm/>} />
      <Route path="/recipes/:ingredient" element={<RecipeList/>}/>
      <Route path="/recipes/:id" element={<RecipeDetails/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
