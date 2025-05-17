import React from "react";
import { AppBar, Toolbar, Box, Container } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{ px: { xs: 0 }, display: "flex", justifyContent: "center" }}
        >
          <Box
            component="img"
            src="/logo-black.388b1619.svg"
            alt="Logikfabriken"
            sx={{
              height: 40,
              width: "auto",
              filter:
                "brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(95%) contrast(104%)",
            }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
