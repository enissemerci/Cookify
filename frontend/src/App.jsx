import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/Feed";
import AddRecipe from "./pages/AddRecipe";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import RecipeSearch from "./pages/RecipeSearch";
import MyLikes from "./pages/MyLikes";
import { MainPage } from "./pages/MainPage";
import DishDetailPage from "./pages/DishDetailPage";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import WorldCuisine from "./pages/WorldCuisine";
import CountryRecipes from "./pages/CountryRecipes"; 



function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/recipes" element={<Feed />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<RecipeSearch />} />
          <Route path="/my-likes" element={<MyLikes />} />
          <Route path="/dish/:id" element={<DishDetailPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/world-cuisine/:country" element={<CountryRecipes />} />
          <Route path="/world-cuisine" element={<WorldCuisine />} />
          <Route path="/world/:country" element={<CountryRecipes />} />

          
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
