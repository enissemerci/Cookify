import { Modal, Box, Typography, TextField, Button } from "@mui/material";

import React, { useState, useEffect } from "react";

const EditProfileModal = ({ open, onClose, userInfo, onSave }) => {
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    bio: "",
    profileImage: "",
  });

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

  const handleSubmit = () => {
    const finalUser = {
      ...updatedUser,
      profileImage: updatedUser.profileImage || userInfo.profileImage,
    };
    onSave(finalUser); // Güncellenen bilgileri parent component'e gönder
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 3, maxWidth: 400, margin: "auto", backgroundColor: "white", marginTop: "10%" }}>
        <Typography variant="h6">Profilini Düzenle</Typography>
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
        <TextField
          label="Profil Resmi URL"
          name="profileImage"
          value={updatedUser.profileImage}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: 2 }}>
          Kaydet
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;