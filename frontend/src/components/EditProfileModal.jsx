import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";

const EditProfileModal = ({ open, onClose, userInfo, onSave }) => {
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    bio: "",
    profileImage: "",
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setUpdatedUser({
        username: userInfo.username || "",
        bio: userInfo.bio || "",
        profileImage: userInfo.profileImage || "",
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data?.imageUrl) {
        setUpdatedUser((prev) => ({ ...prev, profileImage: data.imageUrl }));
      } else {
        alert("Resim yüklenemedi.");
      }
    } catch (err) {
      console.error("Yükleme hatası:", err);
      alert("Resim yüklenemedi.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    onSave(updatedUser); // Yüklenmiş resim URL'si de burada
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 3, maxWidth: 400, margin: "auto", backgroundColor: "white", marginTop: "10%", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>Profilini Düzenle</Typography>

        <TextField
          label="Kullanıcı Adı"
          name="username"
          value={updatedUser.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Biyografi"
          name="bio"
          value={updatedUser.bio}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* YENİ PROFİL RESMİ YÜKLEME ALANI */}
        <input
          type="file"
          accept="image/*"
          id="profile-upload"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) handleImageUpload(file);
          }}
        />
        <label htmlFor="profile-upload">
          <Button
            variant="outlined"
            component="span"
            fullWidth
            sx={{ mt: 2 }}
            disabled={uploading}
          >
            {uploading ? "Yükleniyor..." : "Profil Fotoğrafı Yükle"}
          </Button>
        </label>

        {updatedUser.profileImage && (
          <Typography variant="body2" sx={{ mt: 1, wordBreak: "break-word" }}>
            Yüklenen: {updatedUser.profileImage}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Kaydet
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;
