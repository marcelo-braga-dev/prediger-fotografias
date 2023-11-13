import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import * as React from "react";

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import menuItems from '@/Layouts/ClienteLayout/Menus/MenuPrincipal/menu-items';

export default function MenuPrincipal() {

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = (anchor) => (
        <Box
            sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton href={item.url}>
                            <ListItemText primary={item.nome}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                <ListItem disablePadding>
                    <ListItemButton href={route('clientes.contato')}>
                        <ListItemText primary="Contato"/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (<>
            <div className="row justify-content-between w-100">
                <div className="col-auto mb-0">
                    <a href="/">
                        <img className="" alt="logo" style={{maxWidth: 150}} src="/storage/app/logo_cliente.png"/>
                    </a>
                </div>
                <div className="col-auto d-md-none mb-0 align-items-center">
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={toggleDrawer('left', true)}
                        color="inherit"
                    >
                        <MenuIcon className=""/>
                    </IconButton>
                    <SwipeableDrawer
                        anchor={'left'}
                        open={state['left']}
                        onClose={toggleDrawer('left', false)}
                        onOpen={toggleDrawer('left', true)}
                    >
                        {list('left')}
                    </SwipeableDrawer>
                </div>

                <div className="col d-none d-lg-flex mb-0 align-items-center">
                    <Box sx={{flexGrow: 1, pl: 5, display: {xs: 'none', md: 'flex'}}}>
                        {menuItems.map((page) => (
                            <Button
                                key={page.id}
                                sx={{mr: 2, my: 2, color: 'var(--main-text-color)', display: 'block'}}
                                href={page.url}
                            >
                                {page.nome}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{flexGrow: 0, alignItems: 'm'}}>
                        <a className="btn btn-sm" href={route('clientes.contato')}
                           style={{background: 'var(--main-text-color)', color: 'var(--main-color)'}}>
                            Contato
                        </a>
                    </Box>
                </div>
            </div>
        </>
    )
}
