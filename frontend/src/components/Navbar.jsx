import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Button, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/foto.svg"; // SVG logosunu içe aktarıyoruz


const Navbar = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // localStorage'dan token'ı al
  const token = localStorage.getItem("token");

  // Token kontrolü ve giriş durumu güncelleme
  useEffect(() => {
    setIsLoggedIn(!!token); // token varsa true, yoksa false
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Token'ı sil
    setIsLoggedIn(false); // Giriş durumu güncelle
    navigate("/login"); // Login sayfasına yönlendir
  };

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#f97316", paddingX: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center",paddingBottom:"10px" }}>
            <img src={Logo} alt="Cookify Logo" style={{ height: 75, width: "auto" }} />
          </Link>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
            <Button component={Link} to="/recipes" sx={{ color: "white" }}>Tarifler</Button>
            <Button component={Link} to="/add-recipe" sx={{ color: "white" }}>Tarif Ekle</Button>
            <Button component={Link} to="/my-likes" sx={{ color: "white" }}>Beğendiklerim</Button>

            {isLoggedIn ? (
              <>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Button component={Link} to="/profile" sx={{ color: "white", fontWeight: 500 }}>Profilim</Button>
                  <Button sx={{ color: "white", fontWeight: 500 }} onClick={handleLogout}>Çıkış Yap</Button>
                </Box>
              </>
            ) : (
              <Button sx={{ color: "white", backgroundColor: "#3D405B", "&:hover": { backgroundColor: "#1E1F38" }, fontWeight: 500 }} component={Link} to="/login">
                Giriş Yap
              </Button>
            )}
          </Box>

          <IconButton edge="end" color="inherit" aria-label="menu" sx={{ display: { xs: "block", md: "none" } }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem button component={Link} to="/recipes" onClick={toggleDrawer(false)}>
            <ListItemText primary="Tarifler" />
          </ListItem>
          <ListItem button component={Link} to="/add-recipe" onClick={toggleDrawer(false)}>
            <ListItemText primary="Tarif Ekle" />
          </ListItem>
          <ListItem button component={Link} to="/my-likes" onClick={toggleDrawer(false)}>
            <ListItemText primary="Beğendiklerim" />
          </ListItem>

          {isLoggedIn ? (
            <>
              <ListItem button component={Link} to="/profile" onClick={toggleDrawer(false)}>
                <ListItemText primary="Profilim" />
              </ListItem>
              <ListItem button onClick={() => { handleLogout(); setDrawerOpen(false); }}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <ListItem button component={Link} to="/login" onClick={toggleDrawer(false)}>
              <ListItemText primary="Login" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;