import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RecipeForm from './pages/RecipeForm';
import Signup from './pages/Signup.js';
import RecipeDetails from "./pages/RecipeDetails.js";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-recipe" element={<RecipeForm />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
