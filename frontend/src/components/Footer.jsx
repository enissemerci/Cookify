import React from "react";
import { Box, Typography, Link } from "@mui/material";
import "./Footer.css"; // CSS dosyasını içe aktar

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <Box className="footer-content">
        <Typography variant="h6" color="white">
          Cookify
        </Typography>
        <Typography variant="body2" color="white" sx={{ marginBottom: 2 }}>
          En sevdiğiniz yemekleri keşfedin ve paylaşın!
        </Typography>
        <Box className="footer-links">
          <Link href="/about" className="footer-link">Hakkımızda</Link>
          <Link href="/contact" className="footer-link">İletişim</Link>
          <Link href="/privacy" className="footer-link">Gizlilik Politikası</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;