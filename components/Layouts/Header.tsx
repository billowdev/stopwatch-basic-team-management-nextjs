import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle } from "@mui/icons-material";
import { useAppDispatch } from "@/store/store";
import { signOut, userSelector } from "@/store/slices/userSlice";
import { Badge, Box, Menu, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type HeaderProp = {
  open: boolean;
  onDrawerOpen: () => void;
};

export default function Header({ open, onDrawerOpen }: HeaderProp) {
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setShowProfileMenu(false);
  };

  const userData = useSelector(userSelector)
  
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          การแข่งขันหุ่นยนต์ สัปดาห์วันวิทยาศาสตร์ ปีการศึกษา 2565
        </Typography>

        <Box sx={{ flexGrow: 1 }} />


        <IconButton
            size="large"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>


        <Menu
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={showProfileMenu}
            onClose={handleClose}
          >
            <MenuItem onClick={() => dispatch(signOut())}>ออกจากระบบ</MenuItem>
            <MenuItem onClick={handleClose}>สวัสดีคุณ {userData.username}</MenuItem>
          </Menu>

      </Toolbar>
    </AppBar>
  );
}
