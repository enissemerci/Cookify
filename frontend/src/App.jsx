import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/Feed";
import AddRecipe from "./pages/AddRecipe";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
