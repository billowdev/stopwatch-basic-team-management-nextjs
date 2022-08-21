import React from "react";
import { AppBar, Toolbar, Typography, Grid, Link, Box } from "@material-ui/core";
import { Info, Security } from "@mui/icons-material";

const Footer = () => (
  <Box sx={{ width: "100vw"}} >
    <AppBar position="static" elevation={0} component="footer" color="primary" >
      <Toolbar style={{ justifyContent: "center" }}>
        <Typography variant="caption"><a href="https://github.com/billowdev">©2022 Billowdev</a></Typography>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Footer;
