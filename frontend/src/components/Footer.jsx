import React from "react";
import { Box, Typography, Link } from "@mui/material";
import Logo from "../assets/foto.svg"; // Logoyu içe aktarıyoruz
import "./Footer.css"

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      {/* Sol tarafta logo */}
      <Box className="footer-left">
        <img src={Logo} alt="Cookify Logo" className="footer-logo" />
      </Box>

      {/* Sağ tarafta linkler */}
      <Box className="footer-links">
        <Link href="/about" className="footer-link">Hakkımızda</Link>
        <Link href="/contact" className="footer-link">İletişim</Link>
        <Link href="/privacy" className="footer-link">Gizlilik Politikası</Link>
      </Box>
    </Box>
  );
};

export default Footer;