import React, { useContext } from "react";
import { AuthContext, AuthProvider } from "../../contexts/auth";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BookIcon from "@material-ui/icons/Book";
import AvatarIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import EmprestimoIcon from "@material-ui/icons/TransferWithinAStation";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  toolbar: {
    background: "#333",
  },
  sidebar: {
    background: "#333",
  },
  drawer: {
    height: "100%",
  },
  drawerIcon: {
    color: "#adadad",
  },
  drawerText: {
    color: "#adadad",
  },
});

const DefaultPage = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const { logout } = useContext(AuthContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const drawerWidth = 240;

  const openedMixin = () => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(() => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100.1% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(() => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    height: "100%",
    ...(open && {
      ...openedMixin(),
      "& .MuiDrawer-paper": openedMixin(),
    }),
    ...(!open && {
      ...closedMixin(),
      "& .MuiDrawer-paper": closedMixin(),
    }),
  }));

  const handleLogout = () => {
    setTimeout(() => {
      logout();
    }, 1000);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className={classes.sidebar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon className={classes.drawerText} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className={classes.drawerText}
          >
            Biblioteca
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} className={classes.drawer}>
        <DrawerHeader className={classes.sidebar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon className={classes.drawerText} />
            ) : (
              <ChevronLeftIcon className={classes.drawerText} />
            )}
          </IconButton>
        </DrawerHeader>
        <List className={classes.sidebar} style={{ height: "100%" }}>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <ListItemButton
              key="Home"
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <HomeIcon className={classes.drawerIcon} />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                sx={{ opacity: open ? 1 : 0 }}
                style={{ color: "#adadad", fontWeight: "700" }}
              />
            </ListItemButton>
          </Link>
          <Link to="/livros" style={{ textDecoration: "none" }}>
            <ListItemButton
              key="Obras"
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <BookIcon className={classes.drawerIcon} />
              </ListItemIcon>
              <ListItemText
                primary="Obras"
                sx={{ opacity: open ? 1 : 0 }}
                style={{ color: "#adadad", fontWeight: "bolder" }}
              />
            </ListItemButton>
          </Link>
          <Link to="/clientes" style={{ textDecoration: "none" }}>
            <ListItemButton
              key="Clientes"
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                marginTop: "auto",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AvatarIcon className={classes.drawerIcon} />
              </ListItemIcon>
              <ListItemText
                primary="Clientes"
                sx={{ opacity: open ? 1 : 0 }}
                style={{ color: "#adadad", fontWeight: "bolder" }}
              />
            </ListItemButton>
          </Link>
          <Link to="/emprestimos">
            <ListItemButton
              key="Empréstimos"
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                marginTop: "auto",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <EmprestimoIcon className={classes.drawerIcon} />
              </ListItemIcon>
              <ListItemText
                primary="Empréstimos"
                sx={{ opacity: open ? 1 : 0 }}
                style={{ color: "#adadad", fontWeight: "bolder" }}
              />
            </ListItemButton>
          </Link>
          <ListItemButton
            key="Sair"
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            style={{ bottom: "0", position: "absolute" }}
            onClick={handleLogout}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <LogoutIcon className={classes.drawerIcon} />
            </ListItemIcon>
            <ListItemText
              primary="Sair"
              sx={{ opacity: open ? 1 : 0 }}
              style={{ color: "#adadad", fontWeight: "bolder" }}
            />
          </ListItemButton>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default DefaultPage;
