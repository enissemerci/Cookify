import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// react-slick stil dosyasını dahil edin
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
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
