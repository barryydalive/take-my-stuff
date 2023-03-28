import { styled } from "@mui/system";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";

export const NavAppBar = styled(AppBar)({
  backgroundColor: "#333",
});

export const NavToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const NavLeftContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const NavRightContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const NavTypography = styled(Typography)({
  color: "#fff",
  flex: 1,
  textAlign: "center",
});

export const NavButton = styled(Button)({
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
});
