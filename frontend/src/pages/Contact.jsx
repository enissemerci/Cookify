import React from "react";
import { Container, Typography, TextField, Button, Paper, Box, Divider } from "@mui/material";
import "./Contact.css";
import background from "../assets/CookifyBG.png"; // arka plan görseli

const Contact = () => {
  return (
    <div className="contact-wrapper">
      {/* Arka plan katmanı */}
      <div
        className="contact-background"
        style={{
          backgroundImage: `url(${background})`,
        }}
      />

      {/* İçerik katmanı */}
      <div className="contact-container">
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              backgroundColor: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(4px)",
              borderRadius: 4,
            }}
          >
            <Typography variant="h4" align="center" color="primary" gutterBottom>
              İletişim
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Typography variant="body1" paragraph align="center">
              Bizimle iletişime geçmek isterseniz aşağıdaki formu doldurabilirsiniz.
            </Typography>

            <Box component="form" noValidate>
              <TextField label="Adınız" fullWidth margin="normal" required />
              <TextField label="E-Posta" type="email" fullWidth margin="normal" required />
              <TextField label="Mesajınız" multiline rows={4} fullWidth margin="normal" required />

              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled>
                Gönder
              </Button>
            </Box>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default Contact;