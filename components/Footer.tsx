import React from "react";
import { AppBar, Toolbar, Typography, Grid, Link } from "@material-ui/core";
import { Info, Security } from "@mui/icons-material";
// import { Security, Info } from "@material-ui/icons";

const Footer = () => (
  <>
  
    <AppBar position="static" elevation={0} component="footer" color="primary">
      <Toolbar style={{ justifyContent: "center" }}>
        <Typography variant="caption"><a href="https://github.com/billowdev">©2022 Billowdev</a></Typography>
      </Toolbar>
    </AppBar>
  </>
);

export default Footer;
