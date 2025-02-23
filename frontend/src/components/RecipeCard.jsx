import React from "react";
import foto from "../assets/foto.webp";
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const creationDate = new Date(recipe.createdAt).toLocaleDateString();  // Tarihi formatlamak için

  return (
    <div className="recipe-card">
      {/* Kullanıcı Bilgileri */}
      <div className="user-info">
        <img
          src={recipe.author.profileImage || foto}
          alt={recipe.author.username}
          className="profile-img"
        />
        <div className="user-details">
          <span className="username">{recipe.author.username}</span>
          <span className="email">{recipe.author.email}</span>
        </div>
      </div>

      {/* Tarifin Oluşturulma Tarihi */}
      <div className="creation-date">{creationDate}</div>

      {/* Yemek Fotoğrafı */}
      <img
        src={recipe.image || foto}
        alt={recipe.title}
        className="recipe-image"
      />

      {/* Tarif Bilgileri */}
      <h3 className="recipe-title">{recipe.title}</h3>
      <p className="recipe-description">{recipe.description}</p>

      {/* Beğeni ve Yorumlar */}
      <div className="likes-comments">
        <span className="like-icon">👍</span>
        <span>{recipe.likes.length} Beğeni</span>
        <span className="comment-icon">💬</span>
        <span>{recipe.comments.length} Yorum</span>
      </div>
    </div>
  );
};

export default RecipeCard;