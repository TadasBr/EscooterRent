import { Close, Menu } from "@mui/icons-material";
import { AppBar, Button, Divider, Drawer, IconButton, List, ListItemButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "./Api";

const NavBar = () => {
    const [open, setState] = useState(false);
    const toggleDrawer = (open) => {
        setState(open);
    };

    const flexContainer = {
        flexDirection: 'row',
        padding: 0,
        display: { xs: 'none', sm: 'none', md: 'flex' }
    };

    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    Escoot
                </Typography>
                <IconButton
                    sx={{ display: { md: "none" } }}
                    onClick={() => toggleDrawer(true)}
                >
                    <Menu />
                </IconButton>
                <NavLinks style={flexContainer} toggleDrawer={toggleDrawer} />
                <Drawer
                    anchor="right"
                    variant="temporary"
                    open={open}
                    onClose={() => toggleDrawer(false)}
                    onOpen={() => toggleDrawer(true)}
                >
                    <Box sx={{
                        p: 2,
                        height: 1
                    }}
                    >
                        <IconButton sx={{ mb: 2 }}>
                            <Close onClick={() => toggleDrawer(false)} />
                        </IconButton>
                        <Divider sx={{ mb: 2 }} />
                        <Box>
                            <NavLinks toggleDrawer={toggleDrawer} />
                        </Box>
                    </Box>
                </Drawer>
            </Toolbar>
        </AppBar>);
}

const NavLinks = ({ style, toggleDrawer }) => {
    return (
        <nav>
            <List
                sx={style}
            >
            <ListItemButton>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <NavBarButton name="Home" toggleDrawer={toggleDrawer} />
                </Link>
            </ListItemButton>
            {isLoggedIn() &&
                <ListItemButton>
                    <Link to="/rent-points" style={{ textDecoration: 'none' }}>
                        <NavBarButton name="Rent points" toggleDrawer={toggleDrawer} />
                    </Link>
                </ListItemButton>}

            {!isLoggedIn()
                ? <>
                    <ListItemButton>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <NavBarButton name="Login" toggleDrawer={toggleDrawer} />
                        </Link>
                    </ListItemButton>
                    <ListItemButton>
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            <NavBarButton name="Register" toggleDrawer={toggleDrawer} />
                        </Link>
                    </ListItemButton>
                </>
                : <ListItemButton>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            sessionStorage.clear();
                            window.location.href = "/";
                        }}
                    >Log out</Button>
                </ListItemButton>}
        </List>
        </nav >
    );
}

const NavBarButton = ({ name, toggleDrawer }) => {
    return (
        <Button
        onClick={() => {
            toggleDrawer(false)
        }}
        >
            {name}
        </Button>
    )
}

export default NavBar;